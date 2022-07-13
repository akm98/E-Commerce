import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Results from "./components/Results/Results";
import HomePage from "./Home";
import Test from "./Test";
import ProductDetails from "./components/Product/ProductDetails";

const BaseContainer = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/test' element={<Test />} />
					<Route
						exact
						path='/product/:id'
						element={
							<>
								<Header />
								<ProductDetails />
								<Footer />
							</>
						}
					/>
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
						path='/results/:keyword'
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
