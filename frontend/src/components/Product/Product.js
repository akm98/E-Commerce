import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./Product.css";
import Sample from "../../Assets/sample.jpg";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
const Product = ({ i }) => {
	return (
		<>
			<Link className='product-card' to={"979878979"}>
				<img
					src={
						i % 2
							? Sample
							: "https://m.media-amazon.com/images/I/41O3A6CUd8L.jpg"
					}
				/>

				<p>Red Gear KeyBoard</p>

				<div className='product-desc'>
					<small>
						Redgear Shadow Blade Mechanical Keyboard with Drive Customization
					</small>
				</div>
				<div className='product-ratings'>
					{[1, 2, 3, 4, 5].map(() => (
						<AiFillStar fill='#ffc107' />
					))}
					<span>(256) Reviews</span>
				</div>
				<span>₹2000</span>
			</Link>
		</>
	);
};
export default Product;
