import { useState, useEffect } from 'react'

function useGetVideo(type, id) {
  const [video, setVideo] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then((data) => {
        const videos  = data.results;
        const videoTitle =  videos.find(video => video.type === "Trailer")
        setVideo(videoTitle);
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return video 
}

export default useGetVideo