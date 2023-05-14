import { useEffect, useState } from "react";

export function useGetTitle(type, id) {
  const [title, setTitle] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-MX`)
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
  const [title, setTitle] = useState(null);

  useEffect(()=>{
    const random = Math.trunc(Math.random() * 2) + 1;
    const url = random === 1
                ? "https://api.themoviedb.org/3/discover/tv?api_key=4c42277c85a8a8f307d358420965071c&with_networks=213&language=es-MX"
                : "https://api.themoviedb.org/3/discover/movie?api_key=4c42277c85a8a8f307d358420965071c&with_watch_providers=8&watch_region=US&language=es-MX";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const number = Math.trunc(Math.random() * 20);
        const randomTitle = data.results[number];
        const type = random === 1 ? "tv" : "movie"
        setTitle({...randomTitle, type: type});
      })
      .catch((error) => console.log(error));
  }, [])
  
  return title
}