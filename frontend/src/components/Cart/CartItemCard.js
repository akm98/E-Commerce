import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
	return (
		<div className='CartItemCard'>
			<img src={item.image} alt='ssa' />
			<div>
				<Link to={`/product/${item.productId}`}>
					{item.name.length < 32 ? item.name : item.name.slice(0, 29) + "..."}
				</Link>
				<span>{`Price: ₹${item.price}`}</span>
				<p onClick={() => deleteCartItems(item.productId)}>Remove</p>
			</div>
		</div>
	);
};

export default CartItemCard;
