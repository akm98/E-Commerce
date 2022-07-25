import React from "react";
const Footer = () => {
	return (
		<div className='container'>
			<footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
				<p className='col-md-4 mb-0 text-muted'>© Developed by Akash Mishra</p>

				<ul className='nav col-md-4 justify-content-end'>
					<li>
						<a href='#' className='nav-link px-2 text-muted'>
							Home
						</a>
					</li>
					<li>
						<a href='#' className='nav-link px-2 text-muted'>
							Features
						</a>
					</li>
					<li>
						<a href='#' className='nav-link px-2 text-muted'>
							Pricing
						</a>
					</li>
					<li>
						<a href='#' className='nav-link px-2 text-muted'>
							FAQs
						</a>
					</li>
					<li>
						<a href='#' className='nav-link px-2 text-muted'>
							About
						</a>
					</li>
				</ul>
			</footer>
		</div>
	);
};
export default Footer;
