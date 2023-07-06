import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { ReactComponent as PrevArrowICON } from "../../../../assets/images/prev-arrow.svg";
import { ReactComponent as NextArrowICON } from "../../../../assets/images/next-arrow.svg";
import { AuthContext } from '../../../../context/AuthContext';

function RowIcons({ title }) {
  const { user, setUser, profileSettings, setProfileSettings, setShowIcons } = useContext(AuthContext);
  const [width, setWidth] = useState(window.innerWidth);

  let slidesToShow;
  
  if (width <= 500) {
    slidesToShow = 4;
  } else if (width > 500 && width <= 1100) {
    slidesToShow = 6;
  } else if (width > 1100){
    slidesToShow = 8;
  }

  function handleSave(icon){
    const profile = { 
      ...profileSettings,
      profile_icon: icon
    };

    setProfileSettings(profile);
    setShowIcons(false);
  }

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <span className="slider-arrow prev-arrow" onClick={onClick}>
        <PrevArrowICON/>
      </span>
    );
  }

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <span className="slider-arrow next-arrow" onClick={onClick}>
        <NextArrowICON/>
      </span>
    );
  }

  const settings = {
    speed: 500,
    infinite: title.quantity > slidesToShow,
    variableWidth: true,
    dots: false,
    arrows: title.quantity > slidesToShow,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>
  };

  return (
    <>
      { title &&
        <>
          <h2 className="row-header">
            { title.logo
              ? <div style={{backgroundImage: `url(${title.logo})`}} className="row-icon"/>
              : <div className="row-text">{title.name.replace("-", " ")}</div>
            }
          </h2>
          <Slider {...settings}>
            { Array(title.quantity).fill(0).map((icon, index) => {
              return(
                <div className="icon-content" key={index}>
                  <button
                    className="icon-button"
                    style={{backgroundImage: `url(/images/icons/${title.name}-${index + 1}.png)`}}
                    onClick={()=> handleSave(`/images/icons/${title.name}-${index + 1}.png`)}
                  />
                </div>
              )})
            }
          </Slider>
        </>
      }
    </>
  )
}

export default RowIcons;