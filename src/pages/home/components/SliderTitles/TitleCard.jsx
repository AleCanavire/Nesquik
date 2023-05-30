import React, { useContext, useEffect, useRef, useState } from 'react'
import { homeContext } from '../../../../context/homeContext';
import { useGetCredits, useGetLogos, useGetTitle, useGetVideo } from '../../../../hooks/GetInfoTitle';

function TitleCard({ type, title }) {
  const { showModal, isDrag, search } = useContext(homeContext);
  const [backdrop, setBackdrop] = useState(null);
  const [itemPosition, setItemPosition] = useState();
  const cardRef = useRef();
  const isOver = useRef(null);
  const isFirstRender = useRef(true);

  const titleData = useGetTitle(type, title?.id);
  const video = useGetVideo(type, title?.id);
  const logo = useGetLogos(type, title?.id);
  const credits = useGetCredits(type, title?.id);

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/${type}/${title.id}/images?api_key=4c42277c85a8a8f307d358420965071c`)
      .then(response => response.json())
      .then(data => {
        const backdropTitle = data.backdrops.find(backdrop => backdrop.iso_639_1 === "es") ||
                              data.backdrops.find(backdrop => backdrop.iso_639_1 === "en") ||
                              data.backdrops.find(backdrop => backdrop.iso_639_1)          ||
                              data.backdrops.find(backdrop => backdrop)
        setBackdrop(backdropTitle);
      })
  }, [])
  
  useEffect(()=>{
    const position = cardRef.current.getBoundingClientRect();
    const positionRight = window.innerWidth - (position.left + position.width);
    if (position.left < window.innerWidth * 0.05) {
      setItemPosition("left");
    } else if (positionRight < window.innerWidth * 0.05) {
      setItemPosition("right");
    } else {
      setItemPosition("center");
    }

    if (isFirstRender.current){
      isFirstRender.current = false;
    }
  }, [isDrag, isFirstRender.current, search])

  function onShowModal() {
    isOver.current =  setTimeout(() => {
                        showModal(titleData, logo, backdrop, video, credits, cardRef.current.getBoundingClientRect(), itemPosition);
                      }, 500)
  }
  function onHideModal() {
    clearTimeout(isOver.current);
  }

  return (
    <div className="title-card-wrapper">
      <div ref={cardRef} className="title-card">
        { backdrop?.file_path &&
          <img
            src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
            alt={title.name}
            loading="lazy"
            onMouseOver={onShowModal}
            onMouseLeave={onHideModal}
          />
        }
      </div>
    </div>
  )
}

export default TitleCard