import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Results from "./components/Results/Results";
import UserOptions from "./components/Header/UserOptions";
import HomePage from "./Home";
import Test from "./Test";
import ProductDetails from "./components/Product/ProductDetails";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import { useSelector } from "react-redux";
const BaseContainer = () => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<>
			<Router>
				<Header />
				{isAuthenticated && <UserOptions user={user.user} />}
				<Routes>
					<Route path='/test' element={<Test />} />
					<Route exact path='/product/:id' element={<ProductDetails />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/results/:keyword' element={<Results />} />
					<Route path='/login' element={<LoginSignUp />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
};

export default BaseContainer;
