import React, { useEffect, useState } from 'react';
import { Key } from '../utils/axiosKey';
import {useParams} from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import '../design/MovieDetails.css';
import Cast from './Cast';
import MovieList from './MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites, toggleWatchlist } from '../state/action-creator';

export default function MovieDetails() {

    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const watchlist = useSelector(({movie}) => movie.watchlist);
    const favorites = useSelector(({movie}) => movie.favorites);

    const param = useParams();
    const dispatch = useDispatch();
    const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    const backgroundURL = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    
    useEffect(() => {
        async function getMovieDetail() {
            try {
                const response = await axiosInstance.get(`/movie/${param.movieId}?api_key=${Key}`);
                setMovie(response.data);
                setGenres(response.data.genres);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        async function getMovieCast() {
            try {
                const response1 = await axiosInstance.get(`/movie/${param.movieId}/credits?api_key=${Key}`);
                setCredits(response1.data.cast);
            } catch (error) {
                console.log(error);
            }
        }

        async function getMovieRecommendations() {
            try {
                const response2 = await axiosInstance.get(`/movie/${param.movieId}/recommendations?api_key=${Key}`);
                setRecommendations(response2.data.results);
            } catch (error) {
                console.log(error);
            }
        }
        getMovieRecommendations();
        getMovieCast();
        getMovieDetail();        
    }, [param.movieId])

    function printGenres() {

        return(
            genres?.map(genre =>
                <p className='genres'>{`${genre.name}`}</p>
            )
        );
    }

    function handleWClick() {
        dispatch(toggleWatchlist({movie}.movie));
    }

    function handleFClick() {
        dispatch(toggleFavorites({movie}.movie));
    }

    const selectedWatchlist = watchlist.find((list) => list.id === movie.id);
    const selectedFavorites = favorites.find((list) => list.id === movie.id);

        return (
            <>{loading ? 
            ( <>
                <div className='loader'>
                    Loading...
                </div>
            </> )
            : 
            ( <>                
                <div className='details-page'>
                <div className='details-wrapper'>
                    <img src={backgroundURL} className="bg-image" />
                    <div className='details'>
                    <img src={url}/>
                    <div className='details-content'>
                        <div>
                            <button style={{color: Boolean(selectedWatchlist) ? 'rgb(103,155,241)' : '#ababab'}} class="material-symbols-outlined" onClick={handleWClick}>
                            library_add
                            </button>
                            <button style={{color: Boolean(selectedFavorites) ? '#da2525' : '#ababab'}} class="material-symbols-outlined" onClick={handleFClick}>
                            favorite
                            </button>
                        </div>
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <div className='details-genre-list'><p className='genres-text'>Genres:</p> {printGenres()}</div>
                        <div className='date'><p className='rel-date-text'>Release Date:</p>{movie.release_date}</div> {/* format */}
                        <div className='duration'><p className='runtime-text'>Runtime:</p> {movie.runtime} minutes</div>
                    </div>
                    </div>
                </div>
                <div className='details-cast-w-text'>
                    <h2>Cast</h2>
                    <div className='details-cast'>
                        <Cast cast = {credits}></Cast>
                    </div>
                </div>
                <h2>If you like this movie, take a look at these</h2>
                <div className='movieList'>
                        <MovieList movies= {recommendations}/>
                </div>
            </div>
            </> )
            }
            </>
        );
}