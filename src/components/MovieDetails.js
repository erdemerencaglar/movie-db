import React, { useEffect, useState } from 'react';
import { Key } from '../utils/axiosKey';
import {useParams} from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import '../design/MovieDetails.css';
import Cast from './Cast';
// import Recommendations from './Recommendations';
import MovieList from './MovieList';

export default function MovieDetails() {

    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genres, setGenres] = useState([]);

    const param = useParams();
    console.log(param); 
    console.log(param.movieId);   

    const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    useEffect(() => {
        async function getMovieDetail() {
            try {
                const response = await axiosInstance.get(`/movie/${param.movieId}?api_key=${Key}`);
                setMovie(response.data);
                setGenres(response.data.genres);
            } catch (error) {
                console.log(error);
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

    return(
        <div className='details-page'>
            <div className='details'>
                <img src={url}/>
                <div className='details-content'>
                    <div>
                        <span class="material-symbols-outlined">
                        movie
                        </span>
                        <span class="material-symbols-outlined">
                        star
                        </span>
                    </div>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <div className='details-genre-list'><p className='genres-text'>Genres:</p> {printGenres()}</div>
                    <div className='date'><p className='rel-date-text'>Release Date:</p>{movie.release_date}</div> {/* format */}
                    <div className='duration'><p className='runtime-text'>Runtime:</p> {movie.runtime} minutes</div>
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
    );
}