import React, { useState } from 'react'
import { useEffect } from 'react';
import Episode from './Episode';

function EpisodesContainer({ title }) {
  const [season, setSeason] = useState(1);
  const [episodes, setEpisodes] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(()=>{
    if (title.seasons){
      const selected = title.seasons.find(s => s.season_number === season);
      const episodes = Array(selected.episode_count).fill(0).map((x, i) => i + 1);
      setEpisodes(episodes);
    }
  }, [season]);

  function selectSeason(season) {
    setSeason(season);
    setShowMenu(false);
  }

  return (
    <div className="episodes-container">
      <div className="episode-selector-header">
        <div className="section-header">
          <h3>Episodios</h3>
          { title.seasons.length > 1 &&
            <div className="subtitle-header">{`Temporada ${season}:`}</div>
          }
        </div>
        { title.seasons.length > 1
          ? <div className="episode-selector-dropdown">
              <button onClick={()=> setShowMenu(prev => !prev)} className="dropdown-toggle">
                {`Temporada ${season}`}
              </button>
              { showMenu && 
                <ul className="dropdown-menu">
                  { title.seasons.map((season, index) => {
                    if(season.episode_count && season.overview && season.air_date)
                    return(
                      <li onClick={()=> selectSeason(season.season_number)} className="dropdown-menu-item" key={index}>
                        {`Temporada ${season.season_number}  `}
                        <span className="num-episodes">{`(${season.episode_count} episodios)`}</span>
                      </li>
                    )})
                  }
                </ul>
              }
            </div>
          : <div className="title-season-name">
              {title.title || title.original_title || title.name || title.original_name}
            </div>
        }
        
      </div>
      <div className="episodes-selector-body">
        { episodes?.map(episode => {
            return(
              <Episode
                key={episode}
                season={season}
                episode={episode}
                type={title.type}
                id={title.id}
              />
            )})
        }
      </div>
    </div>
  )
}

export default EpisodesContainer