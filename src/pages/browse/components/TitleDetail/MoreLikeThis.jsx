import { useEffect, useState } from 'react'
import MoreLikeThisItem from './MoreLikeThisItem';

function MoreLikeThis({ title }) {
  const [similarTitles, setSimilarTitles] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/${title.type}/${title.id}/recommendations?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        setSimilarTitles(data.results)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="more-like-this">
      <h3 className="more-like-this-header">
        Más títulos similares a este
      </h3>
      <div style={collapsed ? {maxHeight: "65em"} : {}} className="more-like-this-collapsed">
        <div className="more-like-this-body">
          { similarTitles?.map(similar => {
            if (similar.backdrop_path && similar.overview)
            return(
              <MoreLikeThisItem
                key={similar.id}
                info={similar}
                type={title.type}
                id={similar.id}
              />
            )})
          }
        </div>
      </div>
      <div className={`section-divider ${collapsed ? "collapsed" : {}}`}>
        <button onClick={()=> setCollapsed(prev => !prev)} className="expand-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="ChevronDown"><path fillRule="evenodd" clipRule="evenodd" d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z" fill="currentColor"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default MoreLikeThis