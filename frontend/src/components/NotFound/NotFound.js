import React from "react";
import "./Notfound.css";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const NotFound = () => {
	return (
		<>
			<div className='not-found'>
				<IoWarningOutline />
				<h3>404 Page not found</h3>
				<Link to='/'>Back to Home</Link>
			</div>
		</>
	);
};

export default NotFound;
