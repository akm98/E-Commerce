import React, { useEffect, useState } from "react";
import { Carousel, Tabs, Tab } from "react-bootstrap";
import Product from "./components/Product/Product";
import { getProdcuts } from "./redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./css/Home.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./components/sliderArrows/SliderArrows";
import MetaData from "./components/Header/MetaData";
import Loader from "./components/Loader/Loader";

const HomePage = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, products, error } = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			return alert.error(error);
		}

		dispatch(getProdcuts());
	}, [dispatch, error]);

	const tabs = [
		"Health",
		"Daily Essentials",
		"Accessories",
		"Fashion",
		"Toys",
		"Electronics",
		"Grocery",
	];
	const homeSliderOptions = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	const productSilderOptions = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<MetaData title='AKM STORE' />
			<div className='container'>
				<Slider {...homeSliderOptions} className='slider-main'>
					<div className='image-container'>
						<img src='https://i.imgur.com/X99e6jS.jpg' alt='First slide' />
					</div>
					<div className='image-container'>
						<img src='https://i.imgur.com/hMR8nTl.jpg' alt='Second slide' />
					</div>
					<div className='image-container'>
						<img src='https://i.imgur.com/eodVcYw.jpg' alt='Third slide' />
					</div>
				</Slider>
				<div className='product-section'>
					<h5>Featured Products</h5>
					<Slider className='product-container' {...productSilderOptions}>
						{products &&
							products.map((e, i) => (
								<Product
									name={e.name}
									desc={e.desc}
									price={e.price}
									numOfReviews={e.numOfReviews}
									category={e.category}
									ratings={e.ratings}
									id={e._id}
									image={e.images[0].url}
								/>
							))}
					</Slider>
				</div>
				<div className='product-section'>
					<h5>You May Like</h5>
					<div className='row home-categories'>
						<Tabs defaultActiveKey={"Health"}>
							{tabs.map((tab) => {
								return (
									<Tab className='row' eventKey={tab} title={tab}>
										<div className='product-filters'>
											{products &&
												products.map((e) => (
													<Product
														name={e.name}
														desc={e.desc}
														price={e.price}
														numOfReviews={e.numOfReviews}
														category={e.category}
														ratings={e.ratings}
														id={e._id}
														image={e.images[0].url}
													/>
												))}
										</div>
									</Tab>
								);
							})}
						</Tabs>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
