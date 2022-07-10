import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Typeahead } from "react-bootstrap-typeahead";

const suggestions = ["Akm", "okok", "test", "hmmm"];

const Header = () => {
	return (
		<>
			<Navbar bg='light' variant='light' expand='lg' className='sticky-top'>
				<Container>
					<Navbar.Brand>
						<Link className='text-link' to='/'>
							Company Name
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='navbar' />
					<Nav className='searchBar d-flex justify-content-center'>
						<Typeahead className='searchBar' options={suggestions} />
						<Link to='/results' className='d-flex btn btn-warning'>
							Search{" "}
							<span>
								{" "}
								<i className='fa-solid fa-magnifying-glass ' />{" "}
							</span>
						</Link>
					</Nav>

					<Nav>
						<Link className='text-link' to='/cart'>
							{" "}
							Cart{" "}
						</Link>

						<Nav.Link>
							<Link className='text-link' to='/profile'>
								{" "}
								Profile{" "}
							</Link>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
