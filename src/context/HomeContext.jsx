import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const HomeContext = createContext();

export function HomeContextProvider({ children }) {
  const [infoTitle, setInfoTitle] = useState(null);
  const [miniModal, setMiniModal] = useState(null);
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");
  const { activeProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if (activeProfile && !search){
      navigate("/browse");
    } else if (activeProfile && search){
      setTimeout(() => {
        navigate("/search");
      }, 300);
    }
  }, [search, navigate])

  useEffect(()=>{
    if (activeProfile && infoTitle) {
      const titleName = infoTitle.title || infoTitle.original_title || infoTitle.name || infoTitle.original_name;
      document.title = `${titleName} — Nesquik`
    } else if (activeProfile && !infoTitle) {
      document.title = "Página de inicio — Nesquik"
    }
  }, [activeProfile, infoTitle])

  function onAddInfo(data) {
    setShowMiniModal(false);
    setTimeout(() => {
      setMiniModal(null);
      document.querySelector(".main-view").style = `position: fixed;
                                                    top:  -${window.scrollY}px;
                                                    width: 100%;
                                                    overflow: visible;`;
      window.scrollTo(0, 0);
      setInfoTitle(data);
    }, 300);
  }
  function onAddMiniInfo(title, logo, video, backdrop, credits) {
    setMiniModal({
      ...title,
      logo: logo,
      backdrop: backdrop,
      video: video,
      cast: credits.cast,
      crew: credits.crew
    })
  }

  function closeDetail() {
    const top = document.querySelector(".main-view").style.top.slice(1, -2);
    document.querySelector(".main-view").style = null;
    window.scrollTo(0, top);
    setInfoTitle(null);
  }

  function showModal(title, logo, backdrop, video, credits, position) {
    onAddMiniInfo(title, logo, video, backdrop, credits);
    setPosition(position);
  }
  
  function hideModal() {
    setShowMiniModal(false);
    setTimeout(() => {
      setMiniModal(null);
    }, 200);
  }

  return(
		<HomeContext.Provider
    value={{  infoTitle, miniModal, showMiniModal, position, search,
              onAddInfo, onAddMiniInfo, closeDetail, showModal, hideModal, setShowMiniModal, setInfoTitle, setSearch }}>
			{ children }
		</HomeContext.Provider>
	)
}

