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
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.post(
			"/api/user/login",
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
		const { data } = await axios.post("/api/user/register", user, config);
		dispatch({ type: REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: REGISTER_FAIL, payload: error.response.data });
	}
};

// Auto Sign In user on refreh is token is Valid
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });
		const { data } = await axios.get("/api/user/me");
		dispatch({ type: LOAD_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
	}
};

export const userLogout = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT_REQUEST });
		await axios.get("/api/user/logout");
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

export const updateProfile = (user) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });
		const config = { headers: { "Content-Type": "multipart/form-data" } };
		const { data } = await axios.put("/api/user/me/update", user, config);

		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data });
	}
};

export const updatePassword = (passwordObject) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.put(
			"/api/user/password/update",
			passwordObject,
			config
		);

		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data });
	}
};

export const resetUserPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });

		const { data } = await axios.post("/api/user/password/forgot", { email });

		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data });
	}
};
