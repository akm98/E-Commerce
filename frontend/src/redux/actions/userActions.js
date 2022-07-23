import axios from "axios";
import {
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.post(
			"api/user/login",
			{ email, password },
			config
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({ type: LOGIN_FAIL, payload: err.response.data });
	}
};

export const register = (user) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST });
		const config = { headers: { "Content-Type": "multipart/form-data" } };
		const { data } = await axios.post("api/user/register", user, config);
		dispatch({ type: REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: REGISTER_FAIL, payload: error.response.data });
	}
};

// Auto Sign In user on refreh is token is Valid
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });
		const { data } = await axios.get("api/user/me");
		dispatch({ type: LOAD_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
	}
};

export const userLogout = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT_REQUEST });
		await axios.get("api/user/logout");
		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		dispatch({ type: LOGOUT_FAIL, payload: error.response.data });
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
