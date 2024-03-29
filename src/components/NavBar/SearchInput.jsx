import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseIcon } from "../../assets/images/close-search.svg";
import { HomeContext } from '../../context/HomeContext';

function SearchInput({ showInput }) {
  const navigate = useNavigate();
  const { search, setSearch } = useContext(HomeContext);
  const [inputActive, setInputActive] = useState(false);
  const searchRef = useRef();

  useEffect(()=>{
    setInputActive(true);
  }, [])

  useEffect(()=>{
    function hideInput(e) {
      if (inputActive && search === "" && !searchRef.current.contains(e.target)) {
        showInput(false);
      }
    }
    document.addEventListener("click", hideInput);
    return () => document.removeEventListener("click", hideInput);
  }, [inputActive, search])

  function closeSearch() {
    showInput(false);
    setSearch("");
    navigate("/browse");
  }
  return (
    <div ref={searchRef} className="search-input">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="search-icon" data-name="Search"><path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"></path></svg>
      <input
        onChange={(e) => setSearch(e.target.value)}
        style={inputActive ? {} : {width: 0, padding: 0}}
        type="text"
        placeholder="Títulos, personas, géneros" required
      />
      <span onClick={closeSearch} className="icon-close">
        <CloseIcon/>
      </span>
    </div>
  )
}

export default SearchInput