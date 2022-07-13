import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import { Typeahead } from "react-bootstrap-typeahead";

const suggestions = ["Akm", "okok", "test", "hmmm"];

const Header = () => {
	const [keyword, setKeyword] = useState("");

	const handleInput = (value) => {
		setKeyword(value);
	};

	const searchKeyword = () => {
		if (keyword.trim()) {
		}
	};

	return (
		<>
			<input type='checkbox' id='check' />
			<nav>
				<div className='icon'>
					<Link to='/'>Akm Store</Link>
				</div>
				<div className='search-box'>
					<input
						type='text'
						placeholder='Search for products...'
						value={keyword}
						onChange={(e) => handleInput(e.target.value)}
					/>
					<span onClick={() => searchKeyword()}>
						Search <FiSearch />
					</span>
				</div>
				<ol>
					<li>
						<Link to='/cart'>Cart</Link>
					</li>
					<li>
						<Link to='/profile'>Profile</Link>
					</li>
				</ol>
				<label htmlFor='check' className='bar'>
					<span id='bars'>
						<AiOutlineBars />
					</span>
					<span id='times'>
						<FaTimes />
					</span>
				</label>
			</nav>
		</>
	);
};

export default Header;
