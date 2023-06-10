import { createContext, useState } from 'react'

export const homeContext = createContext();

export function HomeContextProvider({ children }) {
  const [infoTitle, setInfoTitle] = useState(null);
  const [miniModal, setMiniModal] = useState(null);
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");

  function onAddInfo(data) {
    document.querySelector(".home-container").style =  `position: fixed;
                                                        top:  -${window.scrollY}px;
                                                        overflow: visible;`;
    window.scrollTo(0, 0);
    setInfoTitle(data);
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
    const top = document.querySelector(".home-container").style.top.slice(1, -2);
    document.querySelector(".home-container").style = null;
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
		<homeContext.Provider
    value={{  infoTitle, miniModal, showMiniModal, position, search,
              onAddInfo, onAddMiniInfo, closeDetail, showModal, hideModal, setShowMiniModal, setInfoTitle, setSearch }}>
			{ children }
		</homeContext.Provider>
	)
}

