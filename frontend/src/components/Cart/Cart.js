import React, { useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	removeItemsFromCart,
	addItemsToCart,
} from "../../redux/actions/cartActions";
import { useAlert } from "react-alert";
import CartItemCard from "./CartItemCard";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

const Cart = () => {
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.cart);
	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/shipping");
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className='empty-cart'>
					<MdRemoveShoppingCart />

					<p>No Product in Your Cart</p>
					<Link to='/'>View Products</Link>
				</div>
			) : (
				<>
					<div className='cart-page'>
						<div className='cart-header'>
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className='cart-container' key={item.productId}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className='cart-input'>
										<button
											onClick={() =>
												decreaseQuantity(item.productId, item.quantity)
											}
										>
											<BiMinusCircle
												fill={item.quantity > 1 ? "#ef5350" : "#808080"}
											/>
										</button>
										<input type='number' value={item.quantity} readOnly />
										<button
											onClick={() =>
												increaseQuantity(
													item.productId,
													item.quantity,
													item.stock
												)
											}
										>
											<BiPlusCircle
												fill={item.stock > quantity ? "#32CD32" : "#808080"}
											/>
										</button>
									</div>
									<p className='cart-subtotal'>{`₹${
										item.price * item.quantity
									}`}</p>
								</div>
							))}

						<div className='cart-gross-profit'>
							<div></div>
							<div className='cart-gross-profit-box'>
								<p>Gross Total</p>
								<p>{`₹${cartItems.reduce(
									(acc, item) => acc + item.quantity * item.price,
									0
								)}`}</p>
							</div>
							<div></div>
							<div className='check-out-btn'>
								<button onClick={checkoutHandler}>Check Out</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default Cart;
