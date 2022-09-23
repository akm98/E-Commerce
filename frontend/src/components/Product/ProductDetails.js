import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSingleProductDetails,
	newReview,
	clearErrors,
} from "../../redux/actions/productActions";
import { addItemsToCart } from "../../redux/actions/cartActions";
import { useMatch } from "react-router-dom";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../sliderArrows/SliderArrows";
import "./ProductDetails.css";
import { AiFillStar } from "react-icons/ai";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
} from "@mui/material";
import {
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
} from "../../redux/constants/productConstants";
import Loader from "../Loader/Loader";

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
	const [quantity, setQuantity] = useState(1);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [rating, setRating] = useState(4);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();
	const match = useMatch("/product/:id");
	const alert = useAlert();

	const { loading, product, error } = useSelector(
		(state) => state.productDetails
	);
	const { success, error: reviewError } = useSelector(
		(state) => state.newReview
	);
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		}
		if (success) {
			alert.success("Review added successfully");
			dispatch({ type: NEW_REVIEW_REQUEST });
		}
		dispatch(getSingleProductDetails(match.params.id));
	}, [dispatch, alert, match.params.id, success]);

	const increaseQuantity = () => {
		if (product.stock <= quantity) return;
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) setQuantity(quantity - 1);
	};
	const handleAddToCart = () => {
		dispatch(addItemsToCart(match.params.id, quantity));
		alert.success("Item added to cart successfully");
	};

	const submitReviewToggle = () => {
		setDialogOpen(!dialogOpen);
		setComment("");
	};
	const submitReview = () => {
		const myForm = new FormData();
		myForm.set("rating", rating);
		myForm.set("comment", comment);
		myForm.set("productId", match.params.id);
		dispatch(newReview(myForm));
		setDialogOpen(false);
		setComment("");
	};
	const homeSliderOptions = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	return product ? (
		<>
			<div className='product-details'>
				<Slider {...homeSliderOptions} className='product-detail-slider'>
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
				<div className='details-parent'>
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
								<button onClick={increaseQuantity}>
									<BiPlusCircle
										fill={product.stock > quantity ? "#32CD32" : "#808080"}
									/>
								</button>
								<input value={quantity} disabled />
								<button onClick={decreaseQuantity}>
									<BiMinusCircle fill={quantity > 1 ? "#ef5350" : "#808080"} />
								</button>
							</div>
							<button disabled={product.stock <= 0} onClick={handleAddToCart}>
								{product.stock <= 0 ? "Out of Stock" : "Add to cart"}
								<span>
									<FaCartPlus fill='#f1ca3a' />
								</span>{" "}
							</button>
						</div>
						<p>
							Status:<b>{product.stock > 0 ? "In Stock" : "Out of stock"}</b>
						</p>
					</div>
					<button
						onClick={() => {
							setDialogOpen(true);
						}}
						className='add-review'
					>
						Add Review
					</button>
				</div>
			</div>
			<Dialog
				aria-labelledby='simple-dialog-title'
				open={dialogOpen}
				// onClose={submitReviewToggle}
			>
				<DialogTitle>Submit Review</DialogTitle>
				<DialogContent className='submit-dialog'>
					<div className='submit-stars'>
						{" "}
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
						<AiFillStar fill='#ffc107' />
					</div>
					<textarea
						className='submit-dailog-textarea'
						cols='30'
						rows='5'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					></textarea>
					<DialogActions>
						<Button color='primary' onClick={submitReview} className='btn'>
							Submit
						</Button>
						<Button color='secondary' onClick={submitReviewToggle}>
							Cancel
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			<div className='reviews-section'>
				{[11, 2, 2, 2, 3].map(() => (
					<ReviewCard />
				))}
			</div>
		</>
	) : (
		<Loader />
	);
};

export default ProductDetails;
