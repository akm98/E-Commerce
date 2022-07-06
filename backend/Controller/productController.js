const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const ApiFeatures = require("../Utils/apiFeatures");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
//create product
const ITEM_PER_PAGE = 10;

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	req.body.createdBy = req.user.id;
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});

exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
	const itemPerPage = ITEM_PER_PAGE;
	const features = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(itemPerPage);

	const products = await features.query;

	res.status(200).json({
		success: true,
		products,
	});
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({
		success: true,
		product,
	});
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	await product.remove();

	res.status(200).json({
		success: true,
		message: "product deleted sucessfully",
	});
});
