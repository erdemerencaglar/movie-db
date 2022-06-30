import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux';
import  moviesReducer from "./reducers/reducer";
// import { moviesReducer } from "./reducers/reducer";
import thunk from 'redux-thunk';
import reducers from "./reducers";

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
);
