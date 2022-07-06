const ErrorHandler = require("../Utils/errorHandler");

const errorHelper = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500; // internal server error
	err.message = err.message || "Internal Server Error";

	// Mongo db wrong id error
	if (err.name === "CastError") {
		const message = `Resouce not found. Invalid: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message, //err.stack for full detailed error in code
	});
};

module.exports = errorHelper;
