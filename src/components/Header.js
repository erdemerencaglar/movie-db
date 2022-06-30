import React from 'react';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import '../design/Header.css';

const Header = () => {
  return (
    <div className='header'>
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet"></link>
        </div>
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> */}
        
        <Link to="/">
            <div className='left-wrapper'>
                <img src={logo}/>
                <div className='logo-text'>Movie DB App</div>
            </div>
        </Link>

        <div className='right-wrapper'>
            <div className='watchlist'>
                <Link to="/watchlist">
                <div class="material-symbols-outlined">
                movie
                </div>
                <div>Watchlist</div>
                </Link>
            </div>

            <div className='favorites'>
                <Link to="/favorites">
                <span class="material-symbols-outlined">
                    star
                </span>
                <div>Favorites</div>
                </Link>
            </div>
            <input type="text" placeholder="Search Movies..." />
        </div>

    </div>
  );
};
export default Header;