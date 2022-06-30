import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import MovieCard from './MovieCard';
import MovieList from './MovieList';

const Watchlist = () => {

  const store = useSelector(state => state);
  return (
    <>
    <h1>Watchlist</h1>
    <div  className='movieList'>
      <MovieList movies = {store.movie.watchlist} />
    </div>
    </>

  );
};
export default Watchlist;