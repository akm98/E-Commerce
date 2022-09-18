import axios from "axios";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`/api/products/product/${id}`);
		dispatch({
			type: ADD_TO_CART,
			payload: {
				productId: data.product._id,
				name: data.product.name,
				price: data.product.price,
				image: data.product.images[0].url,
				stock: data.product.stock,
				quantity,
			},
		});

		// cart items should prevail even if browser is reloaded
		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	} catch (err) {
		alert(err.message);
	}
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM,
		payload: id,
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch, getState) => {
	dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

	localStorage.setItem("shippingInfo", JSON.stringify(data));
};
