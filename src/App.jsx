import React, { useContext, useEffect } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { homeContext } from './context/homeContext';
import Home from './pages/home/Home';
import NavBar from './pages/home/components/NavBar/NavBar';
import Search from './pages/search/Search';
import MiniTitleDetail from './pages/home/components/MiniTitleDetail/MiniTitleDetail';
import TitleDetail from './pages/home/components/TitleDetail/TitleDetail';

function App() {
  const { infoTitle, miniModal } = useContext(homeContext);

  useEffect(()=>{
    if (infoTitle) {
      const titleName = infoTitle.title || infoTitle.original_title || infoTitle.name || infoTitle.original_name;
      document.title = `${titleName} - Nesquik`
    } else {
      document.title = "Home - Nesquik"
    }
  }, [infoTitle])

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
      {miniModal &&
        <MiniTitleDetail/>
      }
      {infoTitle &&
        <TitleDetail/>
      }
    </BrowserRouter>
  )
}

export default App
