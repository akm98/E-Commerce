import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate, Link } from "react-router-dom";
import "./ConfirmOrder.css";
const ConfirmOrder = () => {
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0
	);
	const shippingCharge = subtotal > 500 ? 0 : 200;
	const tax = subtotal * 0.18;
	const totalPrice = subtotal + shippingCharge + tax;

	const address = `${shippingInfo.address}, ${shippingInfo.city},  ${shippingInfo.shippingState}, India`;

	const proceedToPay = () => {
		const data = {
			subtotal,
			shippingCharge,
			tax,
			totalPrice,
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		navigate("/order/payment");
	};

	return (
		<>
			<MetaData title={"Confirm Order"} />
			<CheckOutSteps activeStep={1} />

			<div className='confirm-order-container'>
				<div>
					<div className='confirm-shipping-area'>
						<h3>Shipping Info</h3>
						<div className='confirm-shipping-info'>
							<div>
								<p>Name:</p>
								<span>{user && user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{shippingInfo.phone}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>

					<div className='confirm-cart-area'>
						<h3>Your Cart Items</h3>
						<div className='confirm-cart-info'>
							{cartItems &&
								cartItems.map((item) => {
									return (
										<div key={item.productId}>
											<img src={item.image} />
											<Link to={`/product/${item.productId}`}>{item.name}</Link>
											<span>
												{item.quantity} x ₹{item.price} = {}
												<b>₹{item.price * item.quantity}</b>
											</span>
										</div>
									);
								})}
						</div>
					</div>
				</div>

				{/* {} */}
				<div>
					<div className='order-summary'>
						<h3>Order Summary</h3>
						<div>
							<div>
								<p>SubTotal:</p>
								<span>₹{subtotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>₹{shippingCharge}</span>
							</div>
							<div>
								<p>GST :</p>
								<span>₹{tax}</span>
							</div>
						</div>
						<div className='order-total'>
							<div>
								<p>
									<b>Total:</b>
								</p>
								<span>₹{totalPrice}</span>
							</div>
						</div>
						<button onClick={proceedToPay}>Proceed To Pay</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
