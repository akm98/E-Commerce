const sendToken = (user, statusCode, res) => {
	//storing token in cookie
	const token = user.getJwtToken();

	// option for cookies
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // days * hrs * mins * sec * ms
		),
		httpOnly: true,
	};

	//sending cookies in response
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		user,
		token,
	});
};

module.exports = sendToken;
