import React, { useEffect, useRef, useState } from "react";
import Product from "../Product/Product";
import "./Results.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { useAlert } from "react-alert";
import { useMatch } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import MetaData from "../Header/MetaData";
import Loader from "../Loader/Loader";

const categories = [
	"Health",
	"Daily Essentials",
	"Accessories",
	"Fashion",
	"Toys",
	"Electronics",
	"Test",
];

const Results = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState([0, 100000]);

	const match = useMatch("/results/:keyword");
	const dispatch = useDispatch();
	const alert = useAlert();
	const {
		products,
		loading,
		error,
		resultsPerPage,
		productsCount,
		filteredProductsCount,
	} = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			return alert.error(error);
		}
		dispatch(getProducts(match.params.keyword, currentPage, price, category));
	}, [dispatch, error, currentPage, price, category, match]);

	const handlePageChange = (e) => {
		setCurrentPage(e);
	};

	const handlePriceChange = (e, newPrice) => {
		setPrice(newPrice);
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<MetaData title='Products Results' />
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
							image={e.images.length > 0 ? e.images[0].url : ""}
						/>
					))}
			</div>

			<div className='filter-box'>
				<p>Price</p>
				<Slider
					value={price}
					onChange={handlePriceChange}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					min={0}
					max={10000}
				/>
				<p>Categories</p>
				<ul className='category-box'>
					{categories.map((category) => (
						<li
							className='category-link'
							key={category}
							onClick={() => setCategory(category)}
						>
							{category}
						</li>
					))}
				</ul>
			</div>

			{filteredProductsCount > resultsPerPage && (
				<div className='pagination-box'>
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={resultsPerPage}
						totalItemsCount={5}
						onChange={handlePageChange}
						nextPageText='>'
						prevPageText='<'
						firstPageText='<<'
						lastPageText='>>'
						itemClass='page-item'
						linkClass='page-link'
						activeClass='page-item-active'
						activeLinkClass='page-link-active'
					/>
				</div>
			)}
		</>
	);
};

export default Results;
