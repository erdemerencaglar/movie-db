import React from 'react';
import { Link } from "react-router-dom";

export default function Cast({cast}) {
    const placeholderURL = "https://cinemaone.net/images/movie_placeholder.png";
    return (
        cast.slice(0,5).map(actor =>
            <Link to={`/cast/${actor.id}`}>
                <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} onError={(e)=>{e.target.onError = null; e.target.src = placeholderURL}}/>
                <p>{actor.name}</p>
            </Link>
        )
      );
}