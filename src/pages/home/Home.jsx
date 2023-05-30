import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import RowTitlesCard from './components/SliderTitles/RowTitlesCard';
import { useContext } from 'react';
import { homeContext } from '../../context/homeContext';

function Home() {
  const { search } = useContext(homeContext);
  const [transition, setTransition] = useState(false);

  useEffect(()=>{
    if (search) {
      setTimeout(() => {
        setTransition(true)
      }, 0);
    }
  }, [search]);

  return (
    <>
      <Header/>
      <main>
        <RowTitlesCard
          section={"Agregados recientemente"}
          type={"tv"}
          url={"&with_watch_providers=8&watch_region=AR&sort_by=first_air_date.desc&page=2"}
          id={"latest-titles"}
        />
        <RowTitlesCard
          section={"Tendencias"}
          type={"tv"}
          url={"&with_watch_providers=8&watch_region=AR"}
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
      { search && 
        <div
          style={{
            background: "rgb(20, 20, 20)",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            opacity: transition ? 1 : 0,
            transition: "opacity .3s ease-out",
            zIndex: 15
          }}
        />
      }
    </>
  )
}

export default Home