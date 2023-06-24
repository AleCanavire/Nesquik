import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { HomeContext } from '../../context/HomeContext';
import Header from './components/Header/Header';
import LazyRowTitles from './components/SliderTitles/LazyRowTitles';
import Profiles from './components/Profiles/Profiles';
import MiniTitleDetail from './components/MiniTitleDetail/MiniTitleDetail';
import TitleDetail from './components/TitleDetail/TitleDetail';

function Home() {
  const { activeProfile } = useContext(AuthContext);
  const { search, miniModal, infoTitle } = useContext(HomeContext);
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
      <div className="main-view">
        { activeProfile
        ? <>
            <Header/>
            <main>
              <LazyRowTitles
                section={"Agregados recientemente"}
                type={"tv"}
                url={"&with_watch_providers=8&watch_region=AR&sort_by=first_air_date.desc&page=3"}
                id={"latest-titles"}
              />
              <LazyRowTitles
                section={"Tendencias"}
                type={"tv"}
                url={"&with_watch_providers=8&watch_region=AR"}
                id={"trends-titles"}
              />
              <LazyRowTitles
                section={"Películas de acción"}
                type={"movie"}
                url={"&with_genres=28&with_watch_providers=8&watch_region=AR"}
                id={"action-movies"}
              />
              <LazyRowTitles
                section={"Series dramáticas coreanas"}
                type={"tv"}
                url={"&with_genres=18&with_watch_providers=8&watch_region=AR&with_original_language=ko&page=2"}
                id={"korean-series"}
              />
              <LazyRowTitles
                section={"Dramas"}
                type={"movie"}
                url={"&with_genres=18&with_watch_providers=8&watch_region=AR&page=2"}
                id={"drama-movies"}
              />
              <LazyRowTitles
                section={"Animación"}
                type={"tv"}
                url={"&with_genres=16&with_watch_providers=8&watch_region=AR&page=4"}
                id={"animation-series"}
              />
              <LazyRowTitles
                section={"Películas de terror"}
                type={"movie"}
                url={"&with_genres=27&with_watch_providers=8&watch_region=AR"}
                id={"horror-movies"}
              />
              <LazyRowTitles
                section={"Series de EE.UU."}
                type={"tv"}
                url={"&with_origin_country=US&with_watch_providers=8&watch_region=AR&page=2"}
                id={"eeuu-series"}
              />
            </main>
          </>
        : <Profiles/>
        }
        
      </div>
      { miniModal &&
        <MiniTitleDetail/>
      }
      { infoTitle &&
        <TitleDetail/>
      }
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