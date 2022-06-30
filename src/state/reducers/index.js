import { combineReducers } from "redux";
import moviesReducer from "./reducer";

const reducers = combineReducers({
    movie: moviesReducer
})

export default reducers;