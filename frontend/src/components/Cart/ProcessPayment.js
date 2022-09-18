import React, { useRef, useEffect } from "react";
import "./ProcessPayment.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BsCreditCard2Back } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { clearErrors, createOrder } from "../../redux/actions/orderActions";

const ProcessPayment = () => {
	const alert = useAlert();
	const elements = useElements();
	const stripe = useStripe();
	const payBtn = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.newOrder);
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const order = {
		shippingInfo: {
			address: shippingInfo.address,
			city: shippingInfo.city,
			pincode: shippingInfo.pincode,
			state: shippingInfo.shippingState,
			country: "India",
			phoneNo: shippingInfo.phone,
		},
		orderItems: cartItems,
		itemsCost: orderInfo.subtotal,
		shippingCost: orderInfo.shippingCharge,
		taxPrice: orderInfo.tax,
		totalPrice: orderInfo.totalPrice,
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	const submitForm = async (e) => {
		e.preventDefault();

		const paymentData = {
			amount: Math.round(orderInfo.totalPrice * 100),
		};
		payBtn.current.disabled = true;
		try {
			const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				"/api/payment/process",
				paymentData,
				config
			);

			const clientSecret = data.client_secret;
			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,

							state: shippingInfo.shippingState,
							country: "IN",
						},
					},
				},
			});
			if (result.error) {
				payBtn.current.disabled = false;
				alert.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};

					dispatch(createOrder(order));
					navigate("/order/success");
				} else {
					alert.error("There was some issue while processing the payment");
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			console.log(error);
		}
	};
	return (
		<>
			<MetaData title='Payment' />
			<CheckOutSteps activeStep={2} />
			<div className='payment-container'>
				<form className='payment-form' onSubmit={(e) => submitForm(e)}>
					<h3>Card Info</h3>
					<div>
						<BsCreditCard2Back />
						<CardNumberElement className='payment-input' />
					</div>
					<div>
						<RiCalendarEventFill />
						<CardExpiryElement className='payment-input' />
					</div>
					<div>
						<MdVpnKey />
						<CardCvcElement className='payment-input' />
					</div>
					<input
						className='btn-pay'
						type='submit'
						value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
						ref={payBtn}
					/>
				</form>
			</div>
		</>
	);
};

export default ProcessPayment;
