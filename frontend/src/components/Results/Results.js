import React, { useEffect, useRef, useState } from "react";
import Product from "../Product/Product";
import "./Results.css";
import { useDispatch, useSelector } from "react-redux";
import { getProdcuts } from "../../redux/actions/productActions";
import { useAlert } from "react-alert";
import { useMatch } from "react-router-dom";
import Pagination from "react-js-pagination";

const Results = () => {
	const [currentPage, setCurrentPage] = useState(1);

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
		dispatch(getProdcuts(match.params.keyword, currentPage));
	}, [dispatch, error, currentPage]);

	const handlePageChange = (e) => {
		setCurrentPage(e);
	};

	return (
		<>
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
