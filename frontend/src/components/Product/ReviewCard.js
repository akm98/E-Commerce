import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import "./ProductDetails.css";

const ReviewCard = () => {
	return (
		<>
			<div className='review-card'>
				<img src='https://lh3.googleusercontent.com/a-/AFdZucodfWoygYG7aD3pyikU9y4r8ZoYf3X9Dq8p6FEM0A=s83-c-mo' />

				<p>Akash Mishra</p>
				<div className='stars'>
					{" "}
					<AiFillStar fill='#ffc107' />
					<AiFillStar fill='#ffc107' />
					<AiFillStar fill='#ffc107' />
					<AiFillStar fill='#ffc107' />
					<AiFillStar fill='#ffc107' />
				</div>
				<span>
					Welcome to the website. If you're here, you're likely looking to find
					random words. Random Word Generator is the perfect tool to help you do
					this. While this tool isn't a word creator, it is a word generator
					that will generate random words for a variety of activities or uses.
					Even better, it allows you to adjust the parameters of the random
					words to best fit your needs.
				</span>
			</div>
		</>
	);
};

export default ReviewCard;
