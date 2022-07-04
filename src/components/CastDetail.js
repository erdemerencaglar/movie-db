import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { axiosInstance, axiosInstanceImg } from "../utils/axiosInstance";
import { Key } from "../utils/axiosKey";
import MovieList from "./MovieList";
import '../design/CastDetail.css';

export default function CastDetail() {

    const param = useParams();
    const [actor, setActor] = useState([]);
    const [img, setImg] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getActor() {
            try {
                const response1 = await axiosInstance.get(`/person/${param.actorId}?api_key=${Key}`);
                setActor(response1.data);
            } catch (error) {
                console.log(error);
            }
        }

        async function getActorImg() {
            try {
                const response2 = await axiosInstance.get(`/person/${param.actorId}/images?api_key=${Key}`);
                setImg(response2.data.profiles[0].file_path);
            } catch (error) {
                console.log(error);
            }
        }

        async function getActorCredits() {
            try {
                const response3 = await axiosInstance.get(`/person/${param.actorId}/movie_credits?api_key=${Key}`);
                setMovies(response3.data.cast);
            } catch (error) {
                console.log(error);
            }
        }
        getActor();
        getActorImg();
        getActorCredits();
    }, [])

    const url = `https://image.tmdb.org/t/p/original/${img}`;
    
    return(
        <>  
            <div className="cast-det-wrapper">
                <div className="cast-det-text">
                    <h1>{actor.name}</h1>
                    <p>{actor.biography}</p>
                </div>
                <img src={url}/>
            </div>
            <div className="cast-det-lower-wrapper">
                <h2>Movies of {actor.name} </h2>
                <div className='movieList'>
                    <MovieList movies= {movies}/>
                </div>
            </div>
        </>
    )
}