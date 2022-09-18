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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import ForgotPassword from "./components/LoginSignUp/ForgotPassword";
import ResetPassword from "./components/LoginSignUp/ResetPassword";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import ProcessPayment from "./components/Cart/ProcessPayment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderDetails from "./components/Cart/OrderDetails";
import MyOrders from "./components/Cart/MyOrders";
import NotFound from "./components/NotFound/NotFound";

const BaseContainer = () => {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	window.addEventListener("contextmenu", (e) => e.preventDefault());

	const stripeApiKey =
		"pk_test_51LikXvSGjLPx0kbgVJv3IVeH72NKmUyiUE9aMbl8HXycQwKamI8VSzKNvzvgXWimiiUigbQLra5mwXyjvH2Bfrod00RwugBosC";
	return (
		<>
			<Router>
				<Header />
				{isAuthenticated && <UserOptions user={user} />}

				<Routes>
					<Route exact path='/test' element={<Test />} />
					<Route exact path='/product/:id' element={<ProductDetails />} />
					<Route exact path='/cart' element={<Cart />} />
					<Route exact path='/profile' element={<Profile />} />
					<Route exact path='/' element={<HomePage />} />
					<Route exact path='/results/:keyword' element={<Results />} />
					<Route exact path='/login' element={<LoginSignUp />} />
					<Route exact path='/profile/update' element={<UpdateProfile />} />
					<Route exact path='/password/update' element={<UpdatePassword />} />
					<Route exact path='/password/forgot' element={<ForgotPassword />} />
					<Route
						exact
						path='/password/reset/:token'
						element={<ResetPassword />}
					/>
					<Route exact path='/shipping' element={<Shipping />} />
					<Route exact path='/order/confirm' element={<ConfirmOrder />} />
					<Route exact path='/order/success' element={<OrderSuccess />} />
					<Route exact path='/orders' element={<MyOrders />} />
					<Route exact path='/order/:id' element={<OrderDetails />} />
					<Route
						exact
						path='/order/payment'
						element={
							<Elements stripe={loadStripe(stripeApiKey)}>
								<ProcessPayment />
							</Elements>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
};

export default BaseContainer;
