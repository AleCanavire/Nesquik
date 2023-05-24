import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactPlayer from 'react-player';
import usePlayerActions from '../../../../hooks/usePlayerActions';
import { ReactComponent as AddToMyList } from "../../../../assets/images/add.svg";
import { ReactComponent as ThumbsUp } from "../../../../assets/images/thumbs-up.svg";
import { ReactComponent as ThumbsUpRated } from "../../../../assets/images/thumbs-up-rated.svg";
import { ReactComponent as ThumbsDown } from "../../../../assets/images/thumbs-down.svg";
import { ReactComponent as ThumbsDownRated } from "../../../../assets/images/thumbs-down-rated.svg";
import { ReactComponent as ThumbsWayUp } from "../../../../assets/images/thumbs-way-up.svg";
import { ReactComponent as ThumbsWayUpRated } from "../../../../assets/images/thumbs-way-up-rated.svg";
import EpisodesContainer from './EpisodesContainer';
import MoreLikeThis from './MoreLikeThis';
import { detailContext } from '../../../../context/detailContext';

function TitleDetail() {
  const [showDetail, setShowDetail] = useState(false);
  const { isMuted, isPlaying, showTrailer, trailerDuration, isEnded,
          setIsPlaying, actionButton, hidePlayer,  endedTrailer } = usePlayerActions();
  const closeButton = useRef();
  const [year, setYear] = useState(null);
  const [duration, setDuration] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  const [genres, setGenres] = useState(null);
  const { infoTitle, closeDetail } = useContext(detailContext);

  useEffect(()=>{
    setShowDetail(true);

    //YEAR
    const year = infoTitle?.first_air_date?.split("-")[0] || infoTitle?.release_date?.split("-")[0]
    setYear(year);

    // DURATION
    if (infoTitle.type === "tv") {
      const duration =  infoTitle?.number_of_seasons > 1
                        ? `${infoTitle?.number_of_seasons} temporadas`
                        : `${infoTitle?.number_of_episodes} episodios`
      setDuration(duration);
    } else if (infoTitle.type === "movie") {
      const hours = Math.floor(infoTitle.runtime / 60);
      const min = infoTitle.runtime % 60;
      const duration = `${hours} h ${min} min`
      setDuration(duration);
    }
    
    // CAST
    const cast = infoTitle.cast.slice(0, 3).map(actor => actor.name);
    setCast(cast)

    // GENRES
    const genres = infoTitle.genres.map(genre => genre.name);
    setGenres(genres)

    // CREW
    const crew = infoTitle.crew.slice(0, 3).map(person => person.name);
    setCrew(crew)
  }, [])

  function handleCloseDetail(e) {
    if (e.target === e.currentTarget || e.currentTarget === closeButton.current) {
      setIsPlaying(false);
      setShowDetail(false);
      setTimeout(closeDetail, 500);
    }
  }
  
  return (
    <>
      <div onClick={handleCloseDetail} className="title-detail-container">
        <div style={showDetail ? {} : {opacity: "0", transform: "scale(0.8)"}} className="title-detail-modal">
          <div className="title-detail-header">
            <div className="title-media">
              <ReactPlayer
                className="title-player"
                style={infoTitle?.type === "movie" ? {transform: "scale(1.4)"} : {transform: "scale(1.25)"}}
                url={`https://www.youtube.com/watch?v=${infoTitle.video?.key}`}
                width="100%"
                height="100%"
                muted={isMuted}
                playing={isPlaying}
                onProgress={e => hidePlayer(e, trailerDuration.current)}
                onDuration={e => trailerDuration.current = e}
                onEnded={endedTrailer}
              />
              <img
                style={showTrailer ? {opacity: "0"} : {}}
                className="title-backdrop"
                src={`https://image.tmdb.org/t/p/w1280${infoTitle.backdrop_path}`}
              />
            </div>
            <div className="title-logo-and-buttons">
              <img
                className="title-logo"
                src={`https://image.tmdb.org/t/p/w300${infoTitle.logo}`}
              />
              <div className="button-controls-container">
                <button className="play-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                  <span>Reproducir</span>
                </button>
                <button className="my-list">
                  <AddToMyList/>
                  <div className="my-list-tooltip">
                    Agregar a Mi lista
                  </div>
                </button>
                <button className="thumbs-rate">
                  <div className="your-rate">
                    <ThumbsUp/>
                  </div>
                  <div className="thumbs-selection-overlay">
                    <div className="thumbs-selection">
                      <ThumbsDown/>
                      <div className="thumbs-selection-tooltip">
                        No es para mí
                      </div>
                    </div>
                    <div className="thumbs-selection">
                      <ThumbsUp/>
                      <div className="thumbs-selection-tooltip">
                        Me gusta
                      </div>
                    </div>
                    <div className="thumbs-selection">
                      <ThumbsWayUp/>
                      <div className="thumbs-selection-tooltip">
                        Me encanta
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div ref={closeButton} onClick={handleCloseDetail} className="title-close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-uia="previewModal-closebtn" role="button" aria-label="close" tabIndex="0"><path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="#fff"></path></svg>
            </div>
            <div onClick={actionButton} className="title-audio-toggle">
              { isEnded
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M13.1747 3.07702C11.01 2.79202 8.81537 3.30372 6.99988 4.51679C5.18439 5.72987 3.8718 7.56158 3.30668 9.67065C2.74155 11.7797 2.96243 14.0223 3.92815 15.9806C4.89388 17.9389 6.53859 19.4794 8.55586 20.3149C10.5731 21.1505 12.8254 21.2242 14.893 20.5224C16.9606 19.8205 18.7025 18.391 19.7942 16.5L18.0622 15.5C17.2131 16.9708 15.8582 18.0826 14.2501 18.6285C12.642 19.1744 10.8902 19.1171 9.32123 18.4672C7.75224 17.8173 6.47302 16.6192 5.7219 15.096C4.97078 13.5729 4.79899 11.8287 5.23853 10.1883C5.67807 8.5479 6.69897 7.12324 8.11102 6.17973C9.52307 5.23623 11.23 4.83824 12.9137 5.05991C14.5974 5.28158 16.1432 6.10778 17.2629 7.3846C18.1815 8.43203 18.762 9.7241 18.9409 11.0921L17.5547 10.168L16.4453 11.8321L19.4453 13.8321C19.7812 14.056 20.2188 14.056 20.5547 13.8321L23.5547 11.8321L22.4453 10.168L20.9605 11.1578C20.784 9.27909 20.0201 7.49532 18.7666 6.06591C17.3269 4.42429 15.3395 3.36202 13.1747 3.07702Z" fill="#fff"></path></svg>
                : isMuted
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="#fff"></path></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="#fff"></path></svg>
              }
            </div>
            <div className="shadowBack"/>
          </div>
          <div className="title-detail-body">
            <div className="title-detail-metadata">
              <div className="metadata-left">
                <div className="metadata-info">
                  <span className="match-score">{Math.floor((Math.random() * (99 - 88)) + 88)} % para ti</span>
                  <span className="title-year">{year}</span>
                  <span className="title-duration">{duration}</span>
                  <span className="title-quality">HD</span>
                  <svg viewBox="0 0 58.07 24" className="svg-icon svg-icon-audio-description"><path fill="#fff" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path></svg>
                </div>
                <div className="title-synopsis">
                  <p>{infoTitle.full_overview}</p>
                </div>
              </div>
              <div className="metadata-right">
                <div className="title-tags">
                  <span className="title-tag-label">Elenco: </span>
                  {cast?.map((actor, index) => {
                    return(
                      <span key={index} className="title-tag-item">{`${actor}, `}</span>
                    )})
                  }
                  <span className="title-tag-item">más</span>
                </div>
                <div className="title-tags">
                  <span className="title-tag-label">Géneros: </span>
                  {genres?.map((genre, index) => {
                    return(
                      <span key={index} className="title-tag-item">{index !== 0 ?  `, ${genre}` : genre}</span>
                    )})
                  }
                </div>
                <div className="title-tags">
                  <span className="title-tag-label">Creado por: </span>
                  {crew?.map((person, index) => {
                    return(
                      <span key={index} className="title-tag-item">{index !== 0 ?  `, ${person}` : person}</span>
                    )})
                  }
                </div>
              </div>
            </div>
            { infoTitle.seasons && 
              <EpisodesContainer
                title={infoTitle}
              />
            }
            <MoreLikeThis
              title={infoTitle}
            />
            <div className="about-title-container">
              <h3 className="about-title-header">
                Acerca de <strong>{infoTitle.title || infoTitle.original_title || infoTitle.name || infoTitle.original_name}</strong>
              </h3>
              <div className="about-title-body">
                <div className="about-tag">
                  <span className="tag-label">Creado por: </span>
                  { crew?.map((person, index) => {
                    return(
                      <span key={index} className="tag-item">{index !== 0 ?  `, ${person}` : person}</span>
                    )})
                  }
                </div>
                <div className="about-tag">
                  <span className="tag-label">Elenco: </span>
                  { cast?.map((actor, index) => {
                    return(
                      <span key={index} className="tag-item">{`${actor}, `}</span>
                    )})
                  } y más
                </div>
                <div className="about-tag">
                  <span className="tag-label">Géneros: </span>
                  { genres?.map((genre, index) => {
                    return(
                      <span key={index} className="tag-item">{index !== 0 ?  `, ${genre}` : genre}</span>
                    )})
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={showDetail ? {opacity: ".7"} : {opacity: "0"}}
        className="title-detail-backdrop"
      />
    </>
  )
}

export default TitleDetail