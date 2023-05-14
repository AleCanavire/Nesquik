import React, { useEffect, useState } from 'react'
import { useGetTitle } from '../../../../hooks/GetInfoTitle';
import { ReactComponent as AddToMyList } from "../../../../assets/images/add.svg";

function MoreLikeThisItem({ info, type, id }) {
  const [title, setTitle] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [duration, setDuration] = useState(null);
  const [year, setYear] = useState(null);

  const titleData = useGetTitle(type, id);
  useEffect(()=>{
    if (!title && titleData) {
      setTitle(titleData);
    }
    if (type) {
      fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=4c42277c85a8a8f307d358420965071c`)
        .then(response => response.json())
        .then(data => {
          const backdrop =  data.backdrops.find(image => image.file_path && image.iso_639_1 === "es") ||
                            data.backdrops.find(image => image.file_path && image.iso_639_1 === "en") ||
                            data.backdrops.find(image => image.file_path && image.iso_639_1)          ||
                            data.backdrops.find(image => image.file_path);
          setBackdrop(backdrop);
        })
        .catch(error => console.log(error))
      // DURATION
      if (title && type === "tv") {
        const duration =  title?.number_of_seasons > 1
                          ? `${title?.number_of_seasons} temporadas`
                          : `${title?.number_of_episodes} episodios`
        setDuration(duration);
      } else if (title && type ===  "movie") {
        const hours = Math.floor(title?.runtime / 60);
        const min = title?.runtime % 60;
        const duration = hours > 0 ? `${hours} h ${min} min` : `${min} min`
        setDuration(duration);
      }
      //YEAR
      const year = title?.first_air_date?.split("-")[0] || title?.release_date?.split("-")[0]
      setYear(year);
    }
  }, [titleData, title])

  return (
    <div className="more-like-this-item">
      <div className="title-card-image">
        <img src={`https://image.tmdb.org/t/p/w780${backdrop?.file_path}`} alt={title?.name} />
        <div className="title-play-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="titleCard-playSVG" data-name="Play"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
        </div>
        {duration && <span className="title-duration">{duration}</span>}
      </div>
      <div className="title-card-metadata-container">
        <div className="title-card-metadata">
          <div className="title-metadata">
            <div className="metadata-first-line">
              <span className="match-score">{Math.floor((Math.random() * (99 - 88)) + 88)} % para ti</span>
            </div>
            <div className="metadata-second-line">
              <span className="year">{year}</span>
            </div>
          </div>
          <button className="my-list">
            <AddToMyList/>
          </button>
        </div>
        <p className="title-card-synopsis">
          {title?.overview || info.overview}
        </p>
      </div>
    </div>
  )
}

export default MoreLikeThisItem