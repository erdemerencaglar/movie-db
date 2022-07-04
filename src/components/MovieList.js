import React from 'react'
import MovieCard from './MovieCard'
import {Route, Routes} from "react-router-dom";
import MovieDetails from './MovieDetails';

export default function MovieList({movies}) {
    return (
        movies.slice(0,20).map(movie => 
            <MovieCard movie = {movie} />
        )
      );
}