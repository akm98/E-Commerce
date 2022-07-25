import { configureStore } from "@reduxjs/toolkit";

import { combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
	productsReducer,
	productDetailsReducer,
} from "./reducers/productReducer";
import {
	userReducer,
	profileReducer,
	resetPasswordReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	resetPassword: resetPasswordReducer,
});

let initialState = {};
const middleware = [thunk];
const store = configureStore({
	reducer,
});

export default store;
