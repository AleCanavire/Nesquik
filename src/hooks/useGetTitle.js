import { useState, useEffect } from 'react'

function useGetTitle(type, id) {
  const [title, setTitle] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-MX`)
      .then(response => response.json())
      .then(data => {
        const overview = data.overview.length > 170 ? `${data.overview.split(".")[0]}.` : data.overview;
        setTitle({...data, overview:overview});
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return title
}

export default useGetTitle