import React, { useContext, useEffect, useRef, useState } from 'react'
import { homeContext } from '../../../../context/homeContext';
import { useGetCredits, useGetLogos, useGetTitle, useGetVideo } from '../../../../hooks/GetInfoTitle';
import { ReactComponent as NetflixOriginals } from "../../../../assets/images/netflix-originals.svg";

function TitleCard({ type, title }) {
  const { showModal } = useContext(homeContext);
  const [backdrop, setBackdrop] = useState(null);
  const cardRef = useRef();
  const isOver = useRef(null);

  const titleData = useGetTitle(type, title?.id);
  const video = useGetVideo(type, title?.id);
  const logo = useGetLogos(type, title?.id);
  const credits = useGetCredits(type, title?.id);

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/${type}/${title.id}/images?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then(data => {
        const backdropTitle = data.backdrops.findLast(backdrop => backdrop.iso_639_1 === "es") ||
                              data.backdrops.find(backdrop => backdrop.iso_639_1 === "en") ||
                              data.backdrops.find(backdrop => backdrop.iso_639_1 === "ko") ||
                              data.backdrops.find(backdrop => backdrop.iso_639_1 === "ja") ||
                              data.backdrops.find(backdrop => !backdrop.iso_639_1)         ||
                              data.backdrops.find(backdrop => backdrop)
        setBackdrop(backdropTitle);
      })
  }, [])

  function onShowModal() {
    isOver.current =  setTimeout(() => {
                        showModal(titleData, logo, backdrop, video, credits, cardRef.current.getBoundingClientRect());
                      }, 500)
  }
  useEffect(()=>{
    function onHideModal(e) {
      if (!cardRef.current.contains(e.target)){
        clearTimeout(isOver.current);
      }
    }
    document.addEventListener("mouseover", onHideModal)
    return () => document.removeEventListener("mouseover", onHideModal)
  }, [])

  return (
    <div className="title-card-wrapper">
      <div ref={cardRef} onMouseOver={onShowModal} className="title-card">
        <div className="title-media">
          { titleData?.networks?.map(network => {
              if (network.id === 213) {
                return <NetflixOriginals key={network}/>
              }
            })
          }
          { backdrop?.file_path &&
            <img
              className="title-backdrop"
              src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
              alt={title.name}
              loading="lazy"
            />
          }
          { (!backdrop?.iso_639_1 && logo?.file_path) &&
            <img
              className="title-logo"
              src={`https://image.tmdb.org/t/p/w185${logo?.file_path}`}
              alt={title.name}
              loading="lazy"
            />
          }
        </div>
      </div>
    </div>
  )
}

export default TitleCard