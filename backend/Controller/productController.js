const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const ApiFeatures = require("../Utils/apiFeatures");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
//create product
const ITEM_PER_PAGE = 9;

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

	const features = new ApiFeatures(Product.find(), req.query).search().filter();

	let products = await features.query;

	const filteredProductsCount = products.length;
	features.pagination(itemPerPage);

	products = await features.query.clone();

	// const productsCount = await Product.length;

	res.status(200).json({
		success: true,
		products,
		filteredProductsCount,
		resultsPerPage: itemPerPage,
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

	product = await Product.findByIdAndUpdate(
		req.params.id.toString(),
		req.body,
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

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

exports.createUpdateProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		comment,
		rating: Number(rating),
	};

	const product = await Product.findById(productId);
	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	const isReviewed = product.reviews.find(
		(each) => each.user._id.toString() === req.user.id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach((each) => {
			if (each.user._id.toString() === req.user.id.toString())
				(each.comment = comment), (each.rating = rating);
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	let totalRatings = 0;
	product.reviews.forEach((each) => (totalRatings += each.rating));

	product.ratings = totalRatings / product.numOfReviews;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({
		success: true,
		data: product.reviews,
	});
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}

	const reviews = product.reviews.filter(
		(each) => each.user._id.toString() !== req.user.id.toString()
	);

	const currentReview = product.reviews.find(
		(each) => each.user._id.toString() === req.user.id.toString()
	);

	product.ratings =
		(product.ratings * product.numOfReviews - currentReview.rating) /
		(product.numOfReviews - 1);

	product.reviews = reviews;
	product.numOfReviews -= 1;

	await product.save({ validateBeforeSave: false });
	res.status(200).json({
		success: true,
		data: product.reviews,
	});
});
