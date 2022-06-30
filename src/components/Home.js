import React, { useEffect, useState } from 'react'

import { axiosInstance } from '../utils/axiosInstance';
import { Key } from '../utils/axiosKey';
import MovieList from './MovieList';
import '../design/Home.css';

const Home = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function axiosgetPopularMovies() {
            try {
                const response = await axiosInstance.get(`/movie/popular?api_key=${Key}`);
                setMovies( response.data.results);
                // console.log(movies);
            } catch (error) {
                console.log(error);
            }
        }
        axiosgetPopularMovies();        
    }, [])
    
  return (
    <div className='movieList'>
        <MovieList movies = {movies} />
    </div>
  );
};
export default Home;