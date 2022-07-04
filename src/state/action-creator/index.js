
function checkWatchlistAlreadyExists(data, id) {
    let alreadyExists = false;

    data.map((movie) => {
        if(id === movie.id) {
            alreadyExists = true;
        }
    })
    return alreadyExists;
}

export const toggleWatchlist = (payload) => {

    return (dispatch) => {

        if(localStorage.getItem("watchlist") == null){
            localStorage.setItem("watchlist", "[]");
        }

        var existingWatchlist = JSON.parse(localStorage.getItem("watchlist"));

        if(!checkWatchlistAlreadyExists(existingWatchlist, payload.id)){
            existingWatchlist.push(payload);
            localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
        }
        else{
            const deletedVersion = existingWatchlist.filter(movie => movie.id !== payload.id);
            localStorage.setItem("watchlist", JSON.stringify(deletedVersion));
        }

        dispatch({
            type: "TOGGLE_WATCHLIST",
            payload
        })
    }
} 

export const toggleFavorites = (payload) => {

    return (dispatch) => {

        if(localStorage.getItem("favorites") == null){
            localStorage.setItem("favorites", "[]");
        }

        var existingFavs = JSON.parse(localStorage.getItem("favorites"));
        
        if(!checkWatchlistAlreadyExists(existingFavs, payload.id)){
            existingFavs.push(payload);
            localStorage.setItem("favorites", JSON.stringify(existingFavs));
        }
        else{
            const deletedVersionFav = existingFavs.filter(movie => movie.id !== payload.id);
            localStorage.setItem("favorites", JSON.stringify(deletedVersionFav)); 
        }

        dispatch({
            type: "TOGGLE_FAVORITES",
            payload
        })
    }
} 