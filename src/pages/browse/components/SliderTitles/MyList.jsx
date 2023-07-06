import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { AuthContext } from '../../../../context/AuthContext';
import { HomeContext } from '../../../../context/HomeContext';
import TitleCard from './TitleCard';
import { ReactComponent as ArrowRowTitle } from "../../../../assets/images/arrow-row-title.svg"
import { ReactComponent as PrevArrowICON } from "../../../../assets/images/prev-arrow.svg";
import { ReactComponent as NextArrowICON } from "../../../../assets/images/next-arrow.svg";

function MyList() {
  const { activeProfile } = useContext(AuthContext);
  const { hideModal } = useContext(HomeContext);
  const [width, setWidth] = useState(window.innerWidth);

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
    <section className="row-title-card">
      <h2 className="row-title-header">
        <a className="row-title" href="/browse">
          <div className="title">
            Mi Lista
          </div>
          <div className="more-visible">
            <div className="see-all">Explorar todos</div>
            <div className="arrow-row-title">
              <ArrowRowTitle/>
            </div>
          </div>
        </a>
      </h2>
      <Slider {...settings}>
        { activeProfile.my_list.map(title => {
          return(
            <TitleCard
              key={title.id}
              type={title.type}
              title={title}
            />
          )})
        }
      </Slider>
    </section>
  )
}

export default MyList