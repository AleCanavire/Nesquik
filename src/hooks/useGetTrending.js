import { useState, useEffect } from 'react'

function useGetTrending() {
  const [title, setTitle] = useState(null);

  useEffect(()=>{
    const random = Math.floor(Math.random() * 2) + 1;
    const url = random === 1
                ? "https://api.themoviedb.org/3/discover/tv?api_key=4c42277c85a8a8f307d358420965071c&with_networks=213&language=es-MX"
                : "https://api.themoviedb.org/3/discover/movie?api_key=4c42277c85a8a8f307d358420965071c&with_watch_providers=8&watch_region=US&language=es-MX";
  
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const number = Math.floor(Math.random() * 20);
        const randomTitle = data.results[number];
        const type = random === 1 ? "tv" : "movie"
        setTitle({...randomTitle, type: type});
      })
      .catch((error) => console.log(error));
  }, [])

  return title
}

export default useGetTrending