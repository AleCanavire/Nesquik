import React, { useContext, useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import TitleDetail from './components/TitleDetail/TitleDetail';
import RowTitlesCard from './components/SliderTitles/RowTitlesCard';
import { detailContext } from '../../context/detailContext';
import MiniTitleDetail from './components/MiniTitleDetail/MiniTitleDetail';

function Home() {
  const { infoTitle, miniModal } = useContext(detailContext);

  useEffect(()=>{
    if (infoTitle) {
      const titleName = infoTitle.title || infoTitle.original_title || infoTitle.name || infoTitle.original_name;
      document.title = `${titleName} — Netflix`
    } else {
      document.title = "Home — Netflix"
    }
  }, [infoTitle])

  return (
    <>
      <NavBar/>
      <Header/>
      <main>
        <RowTitlesCard
          section={"Agregados recientemente"}
          type={"tv"}
          url={"&with_networks=213&sort_by=first_air_date.desc&page=4"}
          id={"latest-titles"}
        />
        <RowTitlesCard
          section={"Tendencias"}
          type={"tv"}
          url={"&with_networks=213"}
          id={"trends-titles"}
        />
        <RowTitlesCard
          section={"Películas de acción"}
          type={"movie"}
          url={"&with_genres=28&with_watch_providers=8&watch_region=AR"}
          id={"action-movies"}
        />
        <RowTitlesCard
          section={"Series dramáticas coreanas"}
          type={"tv"}
          url={"&with_genres=18&with_watch_providers=8&watch_region=AR&with_original_language=ko&page=2"}
          id={"korean-series"}
        />
        <RowTitlesCard
          section={"Dramas"}
          type={"movie"}
          url={"&with_genres=18&with_watch_providers=8&watch_region=AR"}
          id={"drama-movies"}
        />
        <RowTitlesCard
          section={"Animación"}
          type={"tv"}
          url={"&with_genres=16&with_watch_providers=8&watch_region=AR&page=4"}
          id={"animation-series"}
        />
        <RowTitlesCard
          section={"Películas de terror"}
          type={"movie"}
          url={"&with_genres=27&with_watch_providers=8&watch_region=AR"}
          id={"horror-movies"}
        />
        <RowTitlesCard
          section={"Series de EE.UU."}
          type={"tv"}
          url={"&with_origin_country=US&with_watch_providers=8&watch_region=AR&page=2"}
          id={"eeuu-series"}
        />
      </main>
      {miniModal &&
        <MiniTitleDetail/>
      }
      {infoTitle &&
        <TitleDetail/>
      }
    </>
  )
}

export default Home