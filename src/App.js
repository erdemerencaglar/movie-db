import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import NotFound from './components/NotFound';
import {useSelector} from 'react-redux';
import CastDetail from './components/CastDetail';


function App() {
  const store = useSelector(state => state);
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Header input = {input} setInput = {setInput}></Header>
        <div className='wrapper-except-header'>
          <Routes>
            <Route path="/" element={<Home input = {input} setInput = {setInput}/>}/>
            <Route path="/favorites" element={<Favorites/>}></Route>
            <Route path="/watchlist" element={<Watchlist/>}></Route>
            <Route path='/details/:movieId' element={<MovieDetails />}></Route>
            <Route path='/cast/:actorId' element={<CastDetail/>}></Route>
            {/* <Route path='/searchResults' element = {<SearchResults  input = {input} setInput = {setInput}/>}></Route> */}
            <Route path='*' element = {<NotFound/>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
