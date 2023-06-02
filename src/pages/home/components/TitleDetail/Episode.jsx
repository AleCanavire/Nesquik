import React, { useEffect, useState } from 'react'

function Episode({ season, episode, type, id }) {
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/season/${season}/episode/${episode}?api_key=4c42277c85a8a8f307d358420965071c&language=es-MX`)
      .then(response => response.json())
      .then(data => {
        if (data.overview.length > 200) {
          let resume = data.overview.slice(0, 200);
          let lastPoint = resume.lastIndexOf(".");
          let overview = resume.substring(0, lastPoint);
          setEpisodeData({...data, overview: `${overview}.`});
        } else {
          setEpisodeData(data);
        }
        
      })
      .catch(error => console.log(error));
  }, [season, episode])

  return (
    <div className="title-card-episode">
      <div className="title-card-index">
        {episode}
      </div>
      <div className="title-card-image">
        { episodeData?.still_path &&
          <img
            src={`https://image.tmdb.org/t/p/w300${episodeData?.still_path}`}
            alt={episodeData?.name}
            loading="lazy"
          />
        }
        <div className="title-play-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="titleCard-playSVG" data-name="Play"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
        </div>
      </div>
      <div className="title-card-metadata">
        <div className="title-card-title">
          <span className="title">{episodeData?.name}</span>
          <span className="title-duration">{`${episodeData?.runtime} min`}</span>
        </div>
        <p className="title-card-sypnosis">
          {episodeData?.overview}
        </p>
      </div>
    </div>
  )
}

export default Episode