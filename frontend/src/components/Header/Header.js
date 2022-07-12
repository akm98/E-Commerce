import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import { Typeahead } from "react-bootstrap-typeahead";

const suggestions = ["Akm", "okok", "test", "hmmm"];

const Header = () => {
	return (
		<>
			<input type='checkbox' id='check' />
			<nav>
				<div className='icon'>
					<Link to='/'>Akm Store</Link>
				</div>
				<div className='search-box'>
					<input type='text' placeholder='Search for products...' />
					<span>
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
				<label for='check' className='bar'>
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
