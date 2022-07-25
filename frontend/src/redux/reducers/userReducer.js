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
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_RESET,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_RESET,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
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
				user: action.payload.user,
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
				user: {},
				isAuthenticated: false,
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				user: {},
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

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
		case UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				isUpdated: false,
			};

		case UPDATE_PROFILE_SUCCESS:
		case UPDATE_PASSWORD_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload.success,
			};

		case UPDATE_PROFILE_FAIL:
		case UPDATE_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload.message,
			};

		case UPDATE_PROFILE_RESET:
		case UPDATE_PASSWORD_RESET:
			return {
				...state,
				loading: false,
				isUpdated: false,
			};

		default:
			return state;
	}
};

export const resetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
				resetData: null,
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				resetData: action.payload,
			};

		case RESET_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload.message,
			};

		default:
			return state;
	}
};
