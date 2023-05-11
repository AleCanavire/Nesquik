import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import TitleDetail from './components/TitleDetail/TitleDetail';

function Home() {
  const [infoTitle, setInfoTitle] = useState(null);

  function onAddInfo(title, logo, video, credits) {
    setInfoTitle({
      ...title,
      logo: logo.file_path,
      video: video,
      cast: credits.cast,
      crew: credits.crew
    })
  }

  function closeDetail() {
    setInfoTitle(null);
  }

  useEffect(()=>{
    if (infoTitle) {
      const titleName = infoTitle.title || infoTitle.original_title || infoTitle.name || infoTitle.original_name;
      document.title = `${titleName} - Netflix`
    } else {
      document.title = "Home - Netflix"
    }
  }, [infoTitle])

  return (
    <>
      <NavBar/>
      <Header
        infoTitle={infoTitle}
        onAddInfo={onAddInfo}
      />
      { infoTitle &&
        <TitleDetail
          title={infoTitle}
          closeDetail={closeDetail}
        />
      }
    </>
  )
}

export default Home