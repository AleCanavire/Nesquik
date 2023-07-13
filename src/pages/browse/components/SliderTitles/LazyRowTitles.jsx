import React, { Suspense, useEffect, useState } from 'react'
import TitleCardSkeleton from './TitleCardSkeleton';
import { ReactComponent as ArrowRowTitle } from "../../../../assets/images/arrow-row-title.svg"

const RowTitlesCard = React.lazy(
  () => import ("./RowTitlesCard")
)

function LazyRowTitles({ section, type, url, id }) {
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const onChange = (entries) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setShow(true);
        observer.unobserve(document.getElementById(id))
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: "0px"
    })

    observer.observe(document.getElementById(id))
  });

  
  return (
    <section className="row-title-card" id={id}>
      <h2 className="row-title-header">
        <a className="row-title">
          <div className="title">
            {section}
          </div>
          <div className="more-visible">
            <div className="see-all">Explorar todos</div>
            <div className="arrow-row-title">
              <ArrowRowTitle/>
            </div>
          </div>
        </a>
      </h2>
      { show
        ? <Suspense fallback={<TitleCardSkeleton/>}>
            <RowTitlesCard
              type={type}
              url={url}
              id={id}
            />
          </Suspense>
        : <TitleCardSkeleton/>
      }
    </section>
  )
}

export default LazyRowTitles