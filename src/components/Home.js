import React, { useEffect, useState } from 'react'

import { axiosInstance } from '../utils/axiosInstance';
import { Key } from '../utils/axiosKey';
import MovieList from './MovieList';
import '../design/Home.css';
import '../design/Pagination.css';
import ReactPaginate from 'react-paginate';

const Home = ({input, setInput}) => {

    const [pageCount, setPageCount] = useState(1); 
    const [currentPage, setcurrentPage] = useState(1); 
    const [loadingTrends, setLoadingTrends] = useState(true);
    const [loadingSearch, setLoadingSearch] = useState(true);
    const [movies, setMovies] = useState([]);
    let searchInput = input;
    const [results, setResults] = useState([]);
    const [resultNo, setResultNo] = useState(1);
    
    useEffect(() => {
        
        async function getSearchResults() {
            if(!input) return;
            try {
                setLoadingSearch(true);
                const response = await axiosInstance.get(`/search/movie?api_key=${Key}&query==${searchInput}`);
                setResults(response.data.results);
                setResultNo(response.data.total_results);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSearch(false);
            }
        }
        getSearchResults();
    }, [input])

    useEffect(() => {
        async function axiosgetPopularMovies() {
            try {
                const response = await axiosInstance.get(`/movie/popular?api_key=${Key}&page=${currentPage}`);
                if(response.data.total_pages >= 100){
                    setPageCount(100);
                }
                else{
                    setPageCount(response.data.total_pages);
                }
                
                setMovies( response.data.results);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingTrends(false);
            }
        }
        axiosgetPopularMovies();        
        
    }, [])

    async function handleFetch(page) {
        try {
            const response = await axiosInstance.get(`/movie/popular?api_key=${Key}&page=${page}`);
            setPageCount(response.data.total_pages);
            setMovies( response.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingSearch(false);
        }
	};

    async function handlePageChange(selectedObject){
		handleFetch(selectedObject.selected+1);
	};

    return (
        <>
        {input ? (
            <> 
            {loadingSearch ? 
            (<><div style={{padding: `10%`, textAlign: `center`}} >Loading...</div></>) 
            : 
            (<><h1>Search Results</h1>
            {resultNo === 0 ? (<div style={{padding: `10%`, textAlign: `center`}}>Sorry, could not find the movie you are looking for :(</div>) : (<div className='movieList'>
                <MovieList movies= {results}/>
            </div>)}
            </>
            )
            }
            </>
        ) 
        : 
        (
        <>
            {loadingTrends ? 
         (<><div style={{padding: `10%`, textAlign: `center`}} >Loading...</div></>) 
         : 
         (<><div className='container-w-pagination'>
         <div className='text-and-movieList'>
         <h1>Trending Movies</h1>
         <div className='movieList'>
             <MovieList movies = {movies} />
         </div>
         </div>
         <ReactPaginate
         pageCount={pageCount}
         pageRangeDisplayed={2}
         marginPagesDisplayed={1}
         onPageChange={handlePageChange}
         containerClassName={'container'}
         previousLinkClassName={'page'}
         breakClassName={'page'}
         nextLinkClassName={'page'}
         pageClassName={'page'}
         disabledClassName={'disabled'}
         activeClassName={'active'}
         />
        </div></>)}        
        </> 
            )}
    </>
    )
        }
export default Home;
