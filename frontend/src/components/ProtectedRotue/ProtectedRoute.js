import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	return (
		<>
			{loading === false && (
				<Routes>
					<Route
						{...rest}
						render={(props) => {
							debugger;
							if (isAuthenticated === false) {
								return navigate("/login");
							}

							if (isAdmin === true && user.role !== "admin") {
								return navigate("/login");
							}

							return <Component {...props} />;
						}}
					/>
				</Routes>
			)}
		</>
	);
};

export default ProtectedRoute;
