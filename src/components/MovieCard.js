import React, { useEffect, useState } from 'react';
import '../design/MovieCard.css';
import { axiosInstance, axiosInstanceImg } from '../utils/axiosInstance';
import { Link } from "react-router-dom";
import MovieDetails from './MovieDetails';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import { Key } from '../utils/axiosKey';
import { useDispatch } from 'react-redux';
import { toggleFavorites, toggleWatchlist } from '../state/action-creator';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MovieCard({movie}) {

    const [genres, setGenres] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getMovieDet() {
            try {
                const response = await axiosInstance.get(`/movie/${movie.id}?api_key=${Key}`);
                setGenres(...genres, response.data.genres);
            } catch (error) {
                console.log(error);
            }
        }
        getMovieDet();       
    }, [])

    function printGenres() {

        return(
            genres.map(genre =>
                <p className='genre-names'>{`${genre.name}`}</p>
            )
        );
    }

    const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    const placeholderURL = "https://cinemaone.net/images/movie_placeholder.png";

    function handleWatchClick() {

        dispatch(toggleWatchlist(movie));
        // dispatch({
        //     type: "TOGGLE_WATCHLIST",
        //     payload: movie
        // })
        // console.log(movie);
    }

    function handleFavClick() {
        dispatch(toggleFavorites(movie));
    }
    return (
        
        // <Link to={MovieDetails(movie)}>

            <div className='card'>
                <div className='upper-wrap'>
                    <div className='upper-wrap2'>
                        <span className='badge'>{movie.vote_average}</span>
                        <div className='buttons'>
                            <button className="material-symbols-outlined" onClick={() => handleWatchClick()}> movie </button>
                            <button className="material-symbols-outlined" onClick={handleFavClick}>star</button>
                        </div>
                    </div>
                </div>
                <Link to={`/details/${movie.id}`}>
                <img src={url} onError={(e) => {e.target.error=null; e.target.src = placeholderURL}}/>
                <div className='lower-wrap'>
                    <h1>{movie.original_title}</h1>                 
                    <div className='genres-wrapper'>{printGenres()}</div>
                </div>
                </Link>
            </div>
        

      );
}