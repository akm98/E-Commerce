import React, { useState } from "react";
import { Carousel, Tabs, Tab } from "react-bootstrap";
import Product from "./components/Product/Product";
import "./css/Home.css";
const HomePage = () => {
	const productdata = [1, 2, 3, 4, 5, 6];
	const tabs = [
		"Health",
		"Daily Essentials",
		"Accessories",
		"Fashion",
		"Toys",
		"Electronics",
		"Grocery",
	];
	const tabProductData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 123];
	return (
		<>
			<div className='container'>
				<Carousel fade className='carousel '>
					<Carousel.Item>
						<img
							className='d-block w-100 s'
							src='https://i.imgur.com/X99e6jS.jpg'
							alt='First slide'
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className='d-block w-100'
							src='https://i.imgur.com/hMR8nTl.jpg'
							alt='Second slide'
						/>

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className='d-block w-100'
							src='https://i.imgur.com/eodVcYw.jpg'
							alt='Third slide'
						/>

						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>
								Praesent commodo cursus magna, vel scelerisque nisl consectetur.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>

				<div className='product-section'>
					<h5>Featured Products</h5>
					<div className='product-container d-flex'>
						{productdata.map((e, i) => (
							<Product i={i} />
						))}
					</div>
				</div>
				<div className='product-section'>
					<h5>You May Like</h5>
					<div className='row home-categories'>
						<Tabs defaultActiveKey={"Health"}>
							{tabs.map((tab) => {
								return (
									<Tab className='row' eventKey={tab} title={tab}>
										<div className='product-filters'>
											{productdata.map((e) => (
												<Product />
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
