import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./Product.css";
import Sample from "../../Assets/sample.jpg";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const Product = (props) => {
	const { name, desc, price, numOfReviews, category, ratings, id, image } =
		props;

	return (
		<>
			<Link className='product-card' to={`product/${id}`}>
				<img
					src={
						image === "sample url"
							? "https://m.media-amazon.com/images/I/41O3A6CUd8L.jpg"
							: image
					}
				/>

				<p>{name && name.length > 25 ? name.slice(0, 23) + "..." : name}</p>

				<div className='product-desc'>
					<small>
						{desc && desc.length > 70 ? desc.slice(0, 67) + "..." : desc}
					</small>
				</div>
				<div className='product-ratings'>
					{ratings
						? Array(Math.trunc(ratings))
								.fill()
								.map(() => <AiFillStar fill='#ffc107' />)
						: null}
					<span>({numOfReviews}) Reviews</span>
				</div>
				<span>₹{price}</span>
			</Link>
		</>
	);
};
export default Product;
