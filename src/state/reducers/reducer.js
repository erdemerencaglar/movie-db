const initState = {
    watchlist: [],
    favorites: []
}

function checkWatchlistAlreadyExists(state, id) {
    let alreadyExists = false;
    console.log("state", state);
    console.log("id", id);
    state.watchlist.map((movie) => {
        console.log("elemenst", movie);
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
    // console.log("aciton", action);
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