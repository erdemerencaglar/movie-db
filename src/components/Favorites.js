import React from 'react';
import {useSelector} from 'react-redux';
import MovieList from './MovieList';

const Favorites = () => {

  const store = useSelector(state => state);

  return (
    <>
      <h1>Favorites</h1>
      <div  className='movieList'>
        <MovieList movies = {store.movie.favorites} />
      </div>
    </>
  );
};
export default Favorites;