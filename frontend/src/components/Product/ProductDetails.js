import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductDetails } from "../../redux/actions/productActions";
import { useMatch } from "react-router-dom";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../sliderArrows/SliderArrows";
import "./ProductDetails.css";
import { AiFillStar } from "react-icons/ai";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const SliderOptions = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
};

const ProductDetails = () => {
	const dispatch = useDispatch();
	const match = useMatch("/product/:id");

	const { loading, product, error } = useSelector(
		(state) => state.productDetails
	);
	console.log("produc   t", product);

	useEffect(() => {
		dispatch(getSingleProductDetails(match.params.id));
	}, [dispatch]);

	return product ? (
		<>
			<div className='product-details'>
				<Slider className='product-detail-slider'>
					{product.images &&
						product.images.map((each, i) => (
							<div>
								<img
									className='product-detail-images'
									src={each.url}
									key={each.url}
									alt={`${i} Slide`}
								/>
							</div>
						))}
				</Slider>
				<div>
					<div className='details-block-1'>
						<h2>{product.name}</h2>
						<p>{product._id}</p>
					</div>
					<div className='details-block-2'>
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />

						<span>({product.numOfReviews}) Reviews</span>
					</div>
					<div className='details-block-4'>
						Description: <p>{product.desc}</p>
					</div>
					<div className='details-block-3'>
						<div className='cart-options'>
							<div className='quantity'>
								<span>{<BiPlusCircle fill='#ef5350' />}</span>
								<input value={1} type='text' disabled />
								<span>{<BiMinusCircle fill='#66bb6a' />}</span>
							</div>
							<button>
								Add to cart
								<span>
									<FaCartPlus fill='#f1ca3a' />
								</span>{" "}
							</button>
						</div>
						<p>
							Status:<b>{product.stock > 0 ? "In Stock" : "Out of stock"}</b>
						</p>
					</div>
					<button className='add-review'>Add Review</button>
				</div>
			</div>
			<div className='reviews-section'>
				{[11, 2, 2, 2, 3].map(() => (
					<ReviewCard />
				))}
			</div>
		</>
	) : (
		"Loading ..."
	);
};

export default ProductDetails;
