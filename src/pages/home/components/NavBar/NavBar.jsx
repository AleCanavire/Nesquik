import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as NesquikLogo } from "../../../../assets/images/nesquik.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/images/close-search.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { homeContext } from '../../../../context/homeContext';

function NavBar() {
  const [inTop, setInTop] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const inputRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();
  const { search, setSearch } = useContext(homeContext);

  useEffect(()=>{
    function transitionNav() {
      window.scrollY !== 0
      ? setInTop(false)
      : setInTop(true)
    }

    document.addEventListener("scroll", transitionNav);
    return () => document.removeEventListener("scroll", transitionNav);
  }, [])

  useEffect(()=>{
    if (searchActive){
      setTimeout(() => {
        inputRef.current.style = null;
      }, 0);
      setTimeout(() => {
        setTransitionEnd(true);
      }, 300);
    }
    
    function hideInput(e) {
      if (transitionEnd && search === "" && !searchRef.current.contains(e.target)) {
        setSearchActive(false);
        setTransitionEnd(false);
      }
    }
    document.addEventListener("click", hideInput);
    return () => document.removeEventListener("click", hideInput)
  }, [searchActive, transitionEnd, search])
  
  function onSearch(e) {
    setSearch(e.target.value);
    if (e.target.value !== ""){
      setTimeout(() => {
        navigate("/search");
      }, 300);
    } else{
      navigate("/");
    }
  }
  function closeSearch() {
    setSearchActive(false);
    setSearch("");
    navigate("/");
  }

  return (
    <nav style={inTop ? {} : {backgroundColor: "rgb(20 20 20)"}} className="nav-home">
      <div className="menu-navigation">
        <div className="logo-icon">
          <Link to="/">
            <NesquikLogo/>
          </Link>
        </div>
        <ul className="navigation-container">
          <li className="navigation-item"><a href="#">Explorar</a></li>
          <li className="navigation-item"><a href="#" style={{fontWeight: 500, color: "#fff"}}>Inicio</a></li>
          <li className="navigation-item"><a href="#">Series</a></li>
          <li className="navigation-item"><a href="#">Películas</a></li>
          <li className="navigation-item"><a href="#">Novedades populares</a></li>
          <li className="navigation-item"><a href="#">Mi lista</a></li>
          <li className="navigation-item"><a href="#">Explora por idiomas</a></li>
        </ul>
      </div>
      <div className="secondary-navigation">
        <div className="search-wrapper">
          <div className="search">
            { searchActive
              ? <div ref={searchRef} className="search-input">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="search-icon" data-name="Search"><path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"></path></svg>
                  <input
                    onChange={onSearch}
                    style={{width: 0, padding: 0}}
                    ref={inputRef} type="text"
                    placeholder="Títulos, personas, géneros" required
                  />
                  <span onClick={closeSearch} className="icon-close">
                    <CloseIcon/>
                  </span>
                </div>
              : <button onClick={()=> setSearchActive(true)} className="search-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="search-icon" data-name="Search"><path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"></path></svg>
                </button>
            }
          </div>
        </div>
        <div className="notification">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Notification"><path fillRule="evenodd" clipRule="evenodd" d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"></path></svg>
        </div>
        <div className="account">
          <div className="profiles">
            <div className="profile-select">
              <img src="/images/profile1.png"/>
              <span className="arrow-open"></span>
            </div>
            <span className="arrow-close"></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar