import { useState, useEffect } from 'react'

function useGetLogos(type, id) {
  const [logo, setLogo] = useState(null);

  useEffect(()=>{
    if (type)
    fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then((data) => {
        const logos = data.logos;
        const logoTitle = logos.find(logo => logo.iso_639_1 === "es") ||
                          logos.find(logo => logo.iso_639_1 === "en") ||
                          logos.find(logo => logo.iso_639_1);
        if (logoTitle !== undefined) {
          setLogo(logoTitle.file_path);
        }
      })
      .catch((error) => console.log(error));
  }, [type, id])

  return logo
}

export default useGetLogos