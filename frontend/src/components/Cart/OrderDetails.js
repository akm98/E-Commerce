import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate, Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../redux/actions/orderActions";
import "./ConfirmOrder.css";
import Loader from "../Loader/Loader";
const OrderDetails = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const match = useMatch("/order/:id");

	const { order, error, loading } = useSelector((state) => state.orderDetails);
	let address = "";
	if (order && order.shippingInfo)
		address = `${order.shippingInfo.address}, ${order.shippingInfo.city},  ${order.shippingInfo.shippingState}, India`;

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getOrderDetails(match.params.id));
	}, [dispatch, error, alert, match.params.id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`OrderDetails`} />
					<div className='confirm-order-container'>
						<div>
							<div className='confirm-shipping-area'>
								<h3>{`Order Id: ${order && order._id}`}</h3>
								<div className='confirm-shipping-info'>
									<div>
										<p>Name:</p>
										<span>
											{order && order.orderedBy && order.orderedBy.name}
										</span>
									</div>
									<div>
										<p>Phone:</p>
										<span>
											{order &&
												order.shippingInfo &&
												order.shippingInfo.phoneNo}
										</span>
									</div>
									<div>
										<p>Address:</p>
										<span>{address}</span>
									</div>
								</div>
							</div>

							<div className='confirm-cart-area'>
								<h3>Order Items</h3>
								<div className='confirm-cart-info'>
									{order.orderItems &&
										order.orderItems.map((item) => {
											return (
												<div key={item.productId}>
													<img src={item.image} />
													<Link to={`/product/${item.productId}`}>
														{item.name}
													</Link>
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

						<div>
							<div className='order-summary'>
								<h3>Payment Summary</h3>
								<div>
									<div>
										<p>SubTotal:</p>
										<span>₹{order && order.itemsCost}</span>
									</div>
									<div>
										<p>Shipping Charges:</p>
										<span>₹{order && order.shippingCost}</span>
									</div>
									<div>
										<p>GST :</p>
										<span>₹{order && order.taxPrice}</span>
									</div>
								</div>
								<div className='order-total'>
									<div>
										<p>
											<b>Total:</b>
										</p>
										<span>₹{order && order.totalPrice}</span>
									</div>
								</div>
								{/* <button onClick={proceedToPay}>Proceed To Pay</button> */}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default OrderDetails;
