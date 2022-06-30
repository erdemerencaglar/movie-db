import React from 'react'

export default function Cast({cast}) {
    const placeholderURL = "https://cinemaone.net/images/movie_placeholder.png";
    return (
        cast.slice(0,5).map(actor =>
            <div>
                <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} onError={(e)=>{e.target.onError = null; e.target.src = placeholderURL}}/>
                <p>{actor.name}</p>
            </div>
        )
      );
}