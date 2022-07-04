import React, { useEffect, useState } from 'react';
import '../design/MovieCard.css';
import { axiosInstance} from '../utils/axiosInstance';
import { Link } from "react-router-dom";
import { Key } from '../utils/axiosKey';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites, toggleWatchlist } from '../state/action-creator';

export default function MovieCard({movie}) {

    const watchlist = useSelector(({movie}) => movie.watchlist);
    const favorites = useSelector(({movie}) => movie.favorites);

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

    const selectedWatchlist = watchlist.find((list) => list.id === movie.id);
    const selectedFavorites = favorites.find((list) => list.id === movie.id);

    const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    const placeholderURL = "https://cinemaone.net/images/movie_placeholder.png";

    function handleWatchClick() {

        dispatch(toggleWatchlist(movie));
    }

    function handleFavClick() {

        dispatch(toggleFavorites(movie));
    }

    return (
            <div className='card'>
                <div className='upper-wrap'>
                    <div className='upper-wrap2'>
                        <span className='badge'>{parseFloat(movie.vote_average).toFixed(1)}</span>
                        <div className='buttons'>
                            <button style={{color: Boolean(selectedWatchlist) ? 'rgb(103,155,241)' : ''}} className="material-symbols-outlined" onClick={handleWatchClick}> library_add </button>
                            <button style={{color: Boolean(selectedFavorites) ? '#da2525' : ''}} className="material-symbols-outlined" onClick={handleFavClick}>favorite</button>
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