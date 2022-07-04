import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import '../design/Header.css';
import '../App'


const Header = ({input, setInput}) => {

    function handleSearchBox(e) {
        const searchInput = e.target.value;
        setInput(searchInput);
    }

    return (  
    <div className='header'>
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </div>        
        <Link to="/">
            <div className='left-wrapper'>
                <img src={logo}/>
                <div className='logo-text'>Movie DB App</div>
            </div>
        </Link>

        <div className='right-wrapper'>
            <div className='watchlist'>
                <Link to="/watchlist">
                <button id='watchlist-header' className="material-symbols-outlined" style={{color: false  ? 'rgb(103,55,241)' : '#ababab'}}>
                    library_add
                </button>
                </Link>
            </div>

            <div className='favorites'>
                <Link to="/favorites">
                <button id='favorites-header' className="material-symbols-outlined" style={{color: false  ? 'rgb(103,155,241)' : '#ababab'}}>
                    favorite
                </button>
                </Link>
            </div>
            <input type="text" placeholder="Search Movies..." onChange={handleSearchBox} value = {input}/>
        </div>
    </div>
  );
};
export default Header;