import axios from "axios";
import {
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
} from "../constants/productConstants";

export const getProducts =
	(keyword = "", page = 1, price = [0, 25000], category, ratings) =>
	async (dispatch) => {
		try {
			dispatch({ type: ALL_PRODUCT_REQUEST });
			let link = `/api/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
			if (category) {
				link = `/api/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
			}
			const { data } = await axios.get(link);
			dispatch({
				type: ALL_PRODUCT_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: ALL_PRODUCT_FAIL,
				payload: err.response.data.message,
			});
		}
	};

export const getSingleProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/product/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: err.response.data.message,
		});
	}
};

export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.put(
			`/api/products/review/${reviewData.get("productId")}`,
			reviewData,
			config
		);
		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: err.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
