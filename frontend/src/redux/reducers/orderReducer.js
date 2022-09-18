import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	CLEAR_ERRORS,
	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { ...state, loading: true };
		case CREATE_ORDER_SUCCESS:
			return { order: action.payload, loading: false };
		case CREATE_ORDER_FAIL:
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
export const myOrdersReducer = (state = {}, action) => {
	switch (action.type) {
		case MY_ORDER_REQUEST:
			return { ...state, loading: true };
		case MY_ORDER_SUCCESS:
			return { order: action.payload, loading: false };
		case MY_ORDER_FAIL:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { order: action.payload, loading: false };
		case ORDER_DETAILS_FAIL:
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
