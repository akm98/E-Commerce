import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Results from "./components/Results";
import HomePage from "./Home";

const BaseContainer = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/cart'
						element={
							<>
								<Header />
								<Cart />
								<Footer />
							</>
						}
					/>
					<Route
						path='/profile'
						element={
							<>
								<Header />
								<Profile />
								<Footer />
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								<Header />
								<HomePage />
								<Footer />
							</>
						}
					/>
					<Route
						path='/results'
						element={
							<>
								<Header />
								<Results />
								<Footer />
							</>
						}
					/>
					
					
				</Routes>
			</Router>
		</>
	);
};

export default BaseContainer;
