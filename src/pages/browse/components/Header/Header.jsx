import { useState, useEffect, useRef, useContext } from 'react';
import ReactPlayer from 'react-player';
import { HomeContext } from '../../../../context/HomeContext';
import { useGetTrending } from '../../../../hooks/GetInfoTitle';
import usePlayerActions from '../../../../hooks/usePlayerActions';

function Header() {
  const { infoTitle, miniModal, onAddInfo } = useContext(HomeContext);
  const { isMuted, isPlaying, showTrailer, trailerDuration, isEnded, setIsPlaying, actionButton, hidePlayer, endedTrailer } = usePlayerActions();
  const [translate, setTranslate] = useState(0);
  const overviewRef = useRef();

  const title = useGetTrending();

  useEffect(()=>{
    if ((infoTitle || miniModal) && !isEnded) {
      setIsPlaying(false);
    } else if (!infoTitle && !isEnded) {
      setIsPlaying(true)
    }
  }, [infoTitle, miniModal])

  useEffect(()=>{
    if (title?.overview) {
      setTranslate(overviewRef.current.clientHeight);
    }
    const updateTranslate = () => {
      if (title?.overview) {
        setTranslate(overviewRef.current.clientHeight);
      }
    }
    window.addEventListener("resize", updateTranslate)
    return () => window.removeEventListener("resize", updateTranslate);
  }, [title])

  function handleOnAddInfo() {
    onAddInfo(title);
  }

  return (
    <header className="header-title-container">
      <div className="header-title">
        <div className="header-media">
          { title?.video &&
            <ReactPlayer
              className="header-trailer"
              controls={false}
              url={`https://www.youtube.com/watch?v=${title.video.key}`}
              width="100%"
              height="100%"
              muted={isMuted}
              playing={isPlaying}
              onProgress={e => hidePlayer(e, trailerDuration.current)}
              onDuration={e => trailerDuration.current = e}
              onEnded={endedTrailer}
              config={{
                youtube: {
                  playerVars:{
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                  }
                }
              }}
            />
          }
          { title?.backdrop_path &&
            <img
              className="header-backdrop"
              style={showTrailer ? {opacity: "0"} : {}}
              srcSet={`https://image.tmdb.org/t/p/w300${title.backdrop_path} 300w,
                      https://image.tmdb.org/t/p/w780${title.backdrop_path} 780w,
                      https://image.tmdb.org/t/p/w1280${title.backdrop_path} 1280w,
                      https://image.tmdb.org/t/p/original${title.backdrop_path}`}
              alt={title?.title}
            />
          }
        </div>

        <div className="header-content">
          <div className="header-info">
            { title?.logo &&
              <div style={showTrailer ? {transform: `translateY(${translate}px) scale(0.6)`} : {}} className="header-logo-wrapper">
                <div className="header-billboard-logo">
                  <img
                    className="header-logo"
                    src={`https://image.tmdb.org/t/p/w780${title.logo.file_path}`}
                    alt={title?.title}
                  />
                </div>
              </div>
            }
            { title?.overview &&
              <p ref={overviewRef} style={showTrailer ? {transform: `translateY(100%)`, opacity: "0"} : {}} className="header-overview">
                {title.overview}
              </p>}
          </div>
          <div className="header-buttons">
            <button className="play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
              <span>Reproducir</span>
            </button>
            <button onClick={handleOnAddInfo} className="more-info-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="#fff"></path></svg>
              <span>Más información</span>
            </button>
          </div>
        </div>
        <div className="action-button-and-age">
          <div className="action-button-container">
            <div className="action-button" onClick={actionButton}>
              <div className="button-icon">
                { isEnded ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M13.1747 3.07702C11.01 2.79202 8.81537 3.30372 6.99988 4.51679C5.18439 5.72987 3.8718 7.56158 3.30668 9.67065C2.74155 11.7797 2.96243 14.0223 3.92815 15.9806C4.89388 17.9389 6.53859 19.4794 8.55586 20.3149C10.5731 21.1505 12.8254 21.2242 14.893 20.5224C16.9606 19.8205 18.7025 18.391 19.7942 16.5L18.0622 15.5C17.2131 16.9708 15.8582 18.0826 14.2501 18.6285C12.642 19.1744 10.8902 19.1171 9.32123 18.4672C7.75224 17.8173 6.47302 16.6192 5.7219 15.096C4.97078 13.5729 4.79899 11.8287 5.23853 10.1883C5.67807 8.5479 6.69897 7.12324 8.11102 6.17973C9.52307 5.23623 11.23 4.83824 12.9137 5.05991C14.5974 5.28158 16.1432 6.10778 17.2629 7.3846C18.1815 8.43203 18.762 9.7241 18.9409 11.0921L17.5547 10.168L16.4453 11.8321L19.4453 13.8321C19.7812 14.056 20.2188 14.056 20.5547 13.8321L23.5547 11.8321L22.4453 10.168L20.9605 11.1578C20.784 9.27909 20.0201 7.49532 18.7666 6.06591C17.3269 4.42429 15.3395 3.36202 13.1747 3.07702Z" fill="#fff"></path></svg> :
                  isMuted ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="#fff"></path></svg>
                          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="#fff"></path></svg>
                }
              </div>
            </div>
          </div>
          <div className="age-info"><span>18+</span></div>
        </div>
        <div style={showTrailer ? {opacity: 0.7} : {}} className="trailer-vignette"/>
        <div className="hero-vignette"/>
      </div>
    </header>
  )
}

export default Header