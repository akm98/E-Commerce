import React from "react";
import "./OrderSuccess.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
	return (
		<>
			<div className='order-success'>
				<BsCheckCircleFill />
				<h3>Your Order has been placed sucessfully</h3>
				<Link to='/orders'> View Orders</Link>
			</div>
		</>
	);
};

export default OrderSuccess;
