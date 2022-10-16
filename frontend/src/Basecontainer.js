import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";
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
import { loadUser, clearErrors } from "./redux/actions/userActions";
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
import DashBoard from "./components/Admin/DashBoard";

ReactGA.initialize("337586757");

const BaseContainer = () => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	let isAdmin = "guest";
	if (isAuthenticated) {
		isAdmin = user.role === "admin";
	}
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(clearErrors());
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	// window.addEventListener("contextmenu", (e) => e.preventDefault());

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
					<Route exact path='/results/:keyword' element={<Results />} />
					<Route exact path='/login' element={<LoginSignUp />} />
					<Route exact path='/' element={<HomePage />} />
					<Route exact path='/password/forgot' element={<ForgotPassword />} />
					<Route
						exact
						path='/password/reset/:token'
						element={<ResetPassword />}
					/>

					<Route
						exact
						path='/cart'
						element={isAuthenticated ? <Cart /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/profile'
						element={isAuthenticated ? <Profile /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/profile/update'
						element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/password/update'
						element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
					/>

					<Route
						exact
						path='/shipping'
						element={isAuthenticated ? <Shipping /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/order/confirm'
						element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/order/success'
						element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/orders'
						element={isAuthenticated ? <MyOrders /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/order/:id'
						element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />}
					/>
					<Route
						exact
						path='/order/payment'
						element={
							isAuthenticated ? (
								<Elements stripe={loadStripe(stripeApiKey)}>
									<ProcessPayment />
								</Elements>
							) : (
								<LoginSignUp />
							)
						}
					/>
					<Route
						exact
						path='/admin/dashboard'
						element={isAuthenticated ? <DashBoard /> : <LoginSignUp />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
};

export default BaseContainer;
