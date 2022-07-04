const initState = {
    watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
}

function checkWatchlistAlreadyExists(state, id) {
    let alreadyExists = false;
    state.watchlist.map((movie) => {
        
        if(id === movie.id) {
            alreadyExists = true;
        }
    })
    return alreadyExists;
}

function checkFavoritesAlreadyExists(state, id) {
    let alreadyExists = false;
    state.favorites.map((movie) => {
        if(id === movie.id) {
            alreadyExists = true;
        }
    })
    return alreadyExists;
}

const  moviesReducer = (state = initState, action) => {

    switch (action.type) {
        case "TOGGLE_WATCHLIST":
            if(!checkWatchlistAlreadyExists(state, action.payload.id)){
                return {
                    ...state,
                    watchlist: [...state.watchlist, action.payload]
                }
            }
            else{
                return {
                    ...state,
                    watchlist: state.watchlist.filter(movie => movie.id !== action.payload.id)
                }
            }

        case "TOGGLE_FAVORITES":
            if(!checkFavoritesAlreadyExists(state, action.payload.id)){
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }
            }
            else{
                return {
                    ...state,
                    favorites: state.favorites.filter(movie => movie.id !== action.payload.id)
                }
            }

        default:
            return state;
    }
};

export default moviesReducer;