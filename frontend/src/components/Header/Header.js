import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";

const suggestions = ["Akm", "okok", "test", "hmmm"];

const Header = () => {
	const [keyword, setKeyword] = useState("");

	const { isAuthenticated, user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const handleInput = (value) => {
		setKeyword(value);
	};

	const searchKeyword = () => {
		if (keyword.trim()) {
			navigate(`/results/${keyword}`);
		}
	};

	return (
		<>
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
					{!isAuthenticated && (
						<li>
							<Link to='/login'>Login</Link>
						</li>
					)}
				</ol>
			</nav>
		</>
	);
};

export default Header;
