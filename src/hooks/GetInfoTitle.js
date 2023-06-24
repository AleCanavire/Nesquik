import { useEffect, useState } from "react";

export function useGetTitle(type, id) {
  const [title, setTitle] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        const overview = data.overview.length > 170 ? `${data.overview.split(".")[0]}.` : data.overview;
        setTitle({
          ...data,
          full_overview: data.overview,
          overview: overview,
          type: type
        });
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return title
}

export function useGetLogos(type, id) {
  const [logo, setLogo] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then(data => {
        const logos = data.logos;
        const logoTitle = logos.find(logo => logo.iso_639_1 === "es" && logo.width > logo.height) ||
                          logos.find(logo => logo.iso_639_1 === "es") ||
                          logos.find(logo => logo.iso_639_1 === "en" && logo.width > logo.height) ||
                          logos.find(logo => logo.iso_639_1 === "en") ||
                          logos.find(logo => logo.iso_639_1);
        if (logoTitle !== undefined) {
          setLogo(logoTitle);
        }
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return logo
}

export function useGetVideo(type, id) {
  const [video, setVideo] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then(data => {
        const videos  = data.results;
        const videoTitle =  videos.find(video => video.type === "Trailer" && video.iso_639_1 === "es") ||
                            videos.find(video => video.type === "Trailer");
        setVideo(videoTitle);
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return video 
}

export function useGetCredits(type, id) {
  const [credits, setCredits] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then(data => {
        setCredits(data);
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return credits
}

export function useGetTrending() {
  const [header, setHeader] = useState(null);

  const title = useGetTitle(header?.type, header?.id);
  const video = useGetVideo(header?.type, header?.id);
  const logo = useGetLogos(header?.type, header?.id);
  const credits = useGetCredits(header?.type, header?.id);

  useEffect(()=>{
    fetch("https://api.themoviedb.org/3/discover/tv?api_key=4c42277c85a8a8f307d358420965071c&with_networks=213&language=es-ES&page=2")
      .then(response => response.json())
      .then(data => {
        const randomTitle = Math.trunc(Math.random() * 20);
        const titleSelected = data.results[randomTitle];
        setHeader({...titleSelected, type: "tv"});
      })
      .catch((error) => console.log(error));
  }, [])

  const storedHeader = sessionStorage.getItem("title-header");
  if (storedHeader) {
    return JSON.parse(storedHeader);
  } else if (title && video && logo && credits) {
    sessionStorage.setItem("title-header", JSON.stringify({ 
                                                            ...title,
                                                            video,
                                                            logo,
                                                            cast: credits?.cast,
                                                            crew: credits?.crew  
                                                          }
    ))
  }

  return (
    { 
      ...title,
      video,
      logo,
      cast: credits?.cast,
      crew: credits?.crew  
    }
  )
}