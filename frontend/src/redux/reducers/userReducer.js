import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	REGISTER_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case LOAD_USER_REQUEST:
		case LOGOUT_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload.message,
				user: null,
				isAuthenticated: false,
			};
		case LOAD_USER_FAIL:
			return {
				loading: false,
				error: action.payload.message,
				user: null,
				isAuthenticated: false,
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				user: null,
				isAuthenticated: false,
			};

		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				error: action.payload.message,
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
