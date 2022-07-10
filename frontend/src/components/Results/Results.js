import React, { useState } from "react";
import { Carousel, Tabs, Tab } from "react-bootstrap";
import Product from "../Product/Product";
import "./Results.css";

const Results = () => {
	const productdata = [1, 2, 3, 4, 5, 6];

	return (
		<div className='container'>
			<div className='row mt-4'>
				<div className='col-sm-3 filter'>
					<h5>Filters</h5>
				</div>
				<div className='col-sm-9 search-results'>
					<h5>Showing resutls for Keyboard</h5>
					<div className='row'>
						{productdata.map((e) => {
							return <Product />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Results;
