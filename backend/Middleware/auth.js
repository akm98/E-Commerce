const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/errorHandler");
const sendToken = require("../Utils/jwtToken");
const catchAsyncError = require("./catchAsyncErrors");
const User = require("../Models/userModel");

exports.isUserAuthenticated = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHandler("Please login to access", 401));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decodedData.id); // we can get user details from the request obj

	return next();
});

exports.authorizeRoles = (...roles) => {
	// we have access to role in the request obj becaue we have saved it while checking the token
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`${req.user.role} is not allowed to access this resource`
				),
				403
			); // 403 = forbidden
		}

		return next();
	};
};
