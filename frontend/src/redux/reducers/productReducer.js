import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_SUCCESS,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_RESET,
	ADD_NEW_PRODUCT_REQUEST,
	ADD_NEW_PRODUCT_SUCCESS,
	ADD_NEW_PRODUCT_FAIL,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case ALL_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				filteredProductsCount: action.payload.filteredProductsCount,
				resultsPerPage: action.payload.resultsPerPage,
			};
		case ALL_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				product: {},
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload.product,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				...state,

				loading: false,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const addNewProductReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_NEW_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case ADD_NEW_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
			};
		case ADD_NEW_PRODUCT_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
