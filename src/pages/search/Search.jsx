import React, { useContext, useEffect, useState } from 'react'
import { homeContext } from '../../context/homeContext'
import TitleCard from '../home/components/SliderTitles/TitleCard';

function Search() {
  const { search } = useContext(homeContext);
  const [titles, setTitles] = useState([]);

  useEffect(()=>{
    if (search) {
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=4c42277c85a8a8f307d358420965071c&query=${search}&include_adult=false&language=en-US`)
        .then(response => response.json())
        .then(data => {
          const results = data.results.filter(result => (result.media_type === "tv" || "movie") && result.backdrop_path);
          setTitles(results);
        })
        .catch(error => console.log(error))
    } else {
      setTitles([]);
    }
  }, [search])

  return (
    <div className="search-container">
      <div className="search">
        { titles?.length
          ? <>
              <div className="search-title-header">
                <div className="rail">
                  <div className="suggestions">
                      <ul>
                        <span className="suggestions-label">
                          Explora títulos relacionados con:
                        </span>
                        { titles?.slice(0, 5).map(title => {
                          const name = title.title || title.original_title || title.name || title.original_name;
                          return(
                            <li key={title.id} className="suggestions-item">
                              <span>{name}</span>
                            </li>
                          )})
                        }
                      </ul>
                  </div>
                </div>
              </div>
              <div className="gallery-content">
                { titles?.map(title => {
                  return(
                    <TitleCard
                      key={title.id}
                      type={title.media_type}
                      title={title}
                    />
                  )})
                }
              </div>
            </>
          : <div className="not-found-titles">No se encontraron resultados</div>
        }
      </div>
    </div>
  )
}

export default Search