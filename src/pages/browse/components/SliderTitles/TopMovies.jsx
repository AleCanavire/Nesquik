import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { HomeContext } from '../../../../context/HomeContext';
import TopMoviesCard from './TopMoviesCard';
import TitleCardSkeleton from './TitleCardSkeleton';
import { ReactComponent as PrevArrowICON } from "../../../../assets/images/prev-arrow.svg";
import { ReactComponent as NextArrowICON } from "../../../../assets/images/next-arrow.svg";

function TopMovies({ id }) {
  const [titles, setTitles] = useState(null);
  const { hideModal } = useContext(HomeContext);
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(()=>{
    const storedTitles = sessionStorage.getItem(id);
    if (storedTitles) {
      setTitles(JSON.parse(storedTitles));
    } else{
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4c42277c85a8a8f307d358420965071c&with_watch_providers=8&watch_region=AR`)
        .then(response => response.json())
        .then(data =>{
          const titles = data.results.slice(10);
          setTimeout(()=>{
            setTitles(titles);
          }, 3600)
          sessionStorage.setItem(id, JSON.stringify(titles));
        })
        .catch(error => console.log(error))
    }
  }, [])

  let slidesToShow;
  
  if (width <= 500) {
    slidesToShow = 2;
  } else if (width > 500 && width <= 800) {
    slidesToShow = 3;
  } else if (width > 800 && width <= 1100) {
    slidesToShow = 4;
  } else if (width > 1100 && width <= 1400){
    slidesToShow = 5;
  } else {
    slidesToShow = 6;
  }
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  

  function PrevArrow(props) {
    const { onClick, currentSlide } = props;
    return (
      <span
        style={currentSlide === 0 ? {opacity: 0, cursor: "default"} : {}}
        className="slider-arrow prev-arrow"
        onClick={onClick}>
        <PrevArrowICON/>
      </span>
    );
  }

  function NextArrow(props) {
    const { onClick, slideCount, currentSlide } = props;
    return (
      <span
      style={currentSlide !== slideCount - slidesToShow ? {} : {opacity: 0, cursor: "default"}}
      className="slider-arrow next-arrow"
      onClick={onClick}>
        <NextArrowICON/>
      </span>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    beforeChange: () => {hideModal()},
    appendDots: dots => (
      <ul className="slick-dots"> {dots} </ul>
    ),
    customPaging: i => (
      <div/>
    ),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <section className="row-title-card" id={"rank-movies"}>
      <h2 className="row-title-header">
        <a className="row-title">
          <div className="title">
            Las 10 películas más populares en Argentina hoy
          </div>
        </a>
      </h2>
      { titles
        ? <Slider {...settings}>
            { titles.map((title, index) => {
              return(
                <TopMoviesCard
                  key={title.id}
                  type={"movie"}
                  title={title}
                  rank={index}
                />
              )})
            }
          </Slider>
        : <TitleCardSkeleton/>
      }
    </section>
  )
}

export default TopMovies