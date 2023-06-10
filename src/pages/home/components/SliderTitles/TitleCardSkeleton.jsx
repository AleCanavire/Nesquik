import React, { useState } from 'react'
import { useEffect } from 'react'

function TitleCardSkeleton() {
  const [width, setWidth] = useState(window.innerWidth);

  let cards;
  if (width <= 500) {
    cards = 3;
  } else if (width > 500 && width <= 800) {
    cards = 4;
  } else if (width > 800 && width <= 1100) {
    cards = 5;
  } else if (width > 1100 && width <= 1400){
    cards = 6;
  } else {
    cards = 7;
  }
  useEffect(()=>{
    const updateWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [])

  return (
    <div className="titles-skeletons">
      { Array(cards).fill(0).map((title, index)=>{
        return(
          <div key={index} className="title-card-skeleton-wrapper">
            <div style={{animationDelay: `${0.2 * index}s`}} className="title-card-skeleton"/>
          </div>
        )})
      }
    </div>
  )
}

export default TitleCardSkeleton