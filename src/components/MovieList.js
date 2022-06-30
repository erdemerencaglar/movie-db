import React from 'react'
import MovieCard from './MovieCard'
import {Route, Routes} from "react-router-dom";
import MovieDetails from './MovieDetails';

export default function MovieList({movies}) {
    return (
        movies.map(movie => 
            <MovieCard movie = {movie} />
        )
      );
}