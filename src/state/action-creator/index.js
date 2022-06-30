// export const functionName = (parameter) => {
//     return(dispatch) => {
//         dispatch({
//             type: "actionType",
//             payload: parameter
//         });
//     }
// }

export const toggleWatchlist = (payload) => {
    // return({
    //     type: "TOGGLE_WATCHLIST",
    //     payload
    // })
    
    return (dispatch) => {
        localStorage.setItem("watchlist",JSON.stringify(payload));
        dispatch({
            type: "TOGGLE_WATCHLIST",
            payload
        })
    }
} 

export const toggleFavorites = (payload) => {

    return (dispatch) => {
        dispatch({
            type: "TOGGLE_FAVORITES",
            payload
        })
    }
} 