const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true,
	},
	desc: {
		type: String,
		required: [true, "Please enter product description"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		maxLength: [8, "Price cannot exceed 8 figures"],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please specify the category"],
	},
	stock: {
		type: Number,
		maxLength: [4, "Stock cannot exceed 4 figures"],
		default: 1,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			ratings: {
				type: Number,
				required: true,
				maxLength: 5,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Product", productSchema);
