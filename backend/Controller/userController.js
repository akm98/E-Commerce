const ErrorHandler = require("../Utils/errorHandler");
const User = require("../Models/userModel");
const sendToken = require("../Utils/jwtToken");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	let myCloud = {
		public_id: "default",
		secure_url: "default",
	};
	if (req.body.avatar) {
		myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: "avatars",
			width: 150,
			crop: "scale",
		});
	}

	const { name, password, email } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
	});
	sendToken(user, 200, res);
});

exports.userLogin = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ErrorHandler("Please enter email or password", 401));
	}
	//finding by only email and selecting password because password has select false property
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(
			new ErrorHandler("Please enter correct email or password", 401)
		);
	}

	// match passwrod with hash
	isPasswordCorrect = await user.matchPassword(password);

	if (!isPasswordCorrect) {
		return next(
			new ErrorHandler("Please enter correct email or Password", 401)
		);
	}

	sendToken(user, 200, res);
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	sendToken(user, 200, res);
});

exports.getCurrentUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.status(200).json({
		success: true,
		user,
	});
});

exports.logout = catchAsyncErrors((req, res, next) => {
	cookiesOption = {
		expires: new Date(Date.now()),
		httpOnly: true,
	};

	res.status(200).cookie("token", null, cookiesOption).json({
		success: true,
		message: "Logged out successfully",
	});
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorHandler("Email is not registered", 400));
	}

	const resetToken = user.getResetPasswordToken();

	// user.resertPasswordToken = resetToken;
	// user.resertPasswordExpire = Date.now() + 5 * 60 * 1000;
	await user.save({ validateBeforeSave: false });

	const resetUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/password/reset/${resetToken}`;
	const message = `Your password reset link is : \n\n ${resetUrl}\n\n If you have not requested this email Please let us know`;
	try {
		await sendEmail({
			email: user.email,
			subject: "Ecommerce password recovery",
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email send to ${user.email} successfully`,
		});
	} catch (error) {
		user.resertPasswordToken = undefined;
		user.resertPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset password on clicking the reset pass link
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const resertPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resertPasswordToken,
		resertPasswordExpire: { $gt: Date.now() },
	});
	if (!user) {
		return next(
			new ErrorHandler(
				"Token is invalid or has been expired please generate a new reset link",
				400
			)
		);
	}
	if (req.body.password != req.body.confirmPassword) {
		return next(new ErrorHandler("Password doesnt match", 400));
	}
	user.password = req.body.password;
	user.resertPasswordExpire = undefined;
	user.resertPasswordToken = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// update user password
exports.updatePassowrd = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	const { oldPassword, newPassword, confirmPassword } = req.body;
	isPasswordCorrect = await user.matchPassword(oldPassword);

	if (!isPasswordCorrect) {
		return next(new ErrorHandler("Wrong Old Password entered", 400));
	}

	if (newPassword !== confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}

	user.password = newPassword;
	await user.save();

	sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		user,
	});
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		user,
	});
});
