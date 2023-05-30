import { createContext, useState } from 'react'

export const homeContext = createContext();

export function HomeContextProvider({ children }) {
  const [infoTitle, setInfoTitle] = useState(null);
  const [miniModal, setMiniModal] = useState(null);
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [position, setPosition] = useState(null);
  const [itemPosition, setItemPosition] = useState();
  const [isDrag, setIsDrag] = useState(false);
  const [search, setSearch] = useState("");

  function onAddInfo(title, logo, video, credits, backdrop) {
    setInfoTitle({
      ...title,
      logo: logo.file_path,
      backdrop: backdrop,
      video: video,
      cast: credits.cast,
      crew: credits.crew,
    })
  }
  function onAddMiniInfo(title, logo, video, backdrop, credits) {
    setMiniModal({
      ...title,
      logo: logo.file_path,
      backdrop: backdrop,
      video: video,
      cast: credits.cast,
      crew: credits.crew
    })
  }

  function closeDetail() {
    setInfoTitle(null);
  }

  function showModal(title, logo, backdrop, video, credits, position, itemPosition) {
    onAddMiniInfo(title, logo, video, backdrop, credits);
    setPosition(position);
    setItemPosition(itemPosition);
  }
  
  function hideModal() {
    setShowMiniModal(false);
    setTimeout(() => {
      setMiniModal(null);
    }, 300);
  }

  return(
		<homeContext.Provider
    value={{  infoTitle, miniModal, showMiniModal, position, itemPosition, isDrag, search,
              onAddInfo, onAddMiniInfo, closeDetail, showModal, hideModal, setShowMiniModal, setInfoTitle, setIsDrag, setSearch }}>
			{ children }
		</homeContext.Provider>
	)
}

