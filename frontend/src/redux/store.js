import { configureStore } from "@reduxjs/toolkit";

import { combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
	productsReducer,
	productDetailsReducer,
	newReviewReducer,
} from "./reducers/productReducer";
import {
	userReducer,
	profileReducer,
	passwordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
	newOrderReducer,
	myOrdersReducer,
	orderDetailsReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	password: passwordReducer,
	cart: cartReducer,
	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	orderDetails: orderDetailsReducer,
	newReview: newReviewReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
};
const middleware = [thunk];
const store = configureStore({
	reducer,
	preloadedState: initialState,
});

export default store;
