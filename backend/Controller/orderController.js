const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsCost,
		shippingCost,
		taxPrice,
		totalPrice,
	} = req.body;

	const order = await Order.create({
		shippingInfo,
		orderItems,
		paymentInfo,
		itemsCost,
		shippingCost,
		taxPrice,
		totalPrice,
		paidAt: Date.now(),
		orderedBy: req.user._id,
	});

	orderItems.forEach(
		async (eachOrder) =>
			await updateStock(eachOrder.productId, eachOrder.quantity)
	);

	res.status(201).json({
		success: true,
		order,
	});
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"orderedBy",
		"name email"
	);

	if (!order) {
		return next(new ErrorHandler("Order not found", 404));
	}
	res.status(201).json({
		success: true,
		order,
	});
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((eachOrder) => {
		totalAmount += eachOrder.totalPrice;
	});

	res.status(201).json({
		success: true,
		orders,
		totalAmount,
	});
});

exports.getLoggedInUserOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ orderedBy: req.user.id });

	res.status(201).json({
		success: true,
		orders,
	});
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
	const { orderStatus } = req.body;
	const order = await Order.findById(req.params.id);

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("Order already delivered", 400));
	}
	// updating product stock for every item ordered
	order.orderItems.forEach(
		async (eachOrder) =>
			await updateStock(eachOrder.product, eachOrder.quantity)
	);

	order.orderStatus = orderStatus;
	if (order.orderStatus === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save({ validateBeforeSave: false });

	res.status(201).json({
		success: true,
		order,
	});
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	await order.remove();

	res.status(201).json({
		success: true,
	});
});

const updateStock = async (id, quantity) => {
	const product = await Product.findById(id);
	console.log(product);
	product.stock -= quantity;
	await product.save({ validateBeforeSave: false });
};
