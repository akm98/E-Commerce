const moongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const testEmail = (email) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	return emailRegex.test(email);
};

const userSchema = new moongoose.Schema({
	name: {
		type: String,
		maxLength: [30, "Name is too big please use a shortform"],
		minLenght: [3, "Name is too short"],
		required: true,
	},
	email: {
		type: String,
		required: [true, "Please enter email"],
		unique: [true, "Email already exists"],
		validate: [testEmail, "Please Enter Valid Email"],
	},
	password: {
		type: String,
		required: [true, "Please enter password"],
		select: false,
		minLength: [8, "Please enter password more than 8 characters"],
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	resertPasswordToken: String,
	resertPasswordExpire: Date,
});

// Encrypting password so it can be known with user and no one else

userSchema.pre("save", async function (next) {
	// to prevent encrypting the encrypted password while updating name or email etc

	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hashSync(this.password, 10);
});

// JWT Token
userSchema.methods.getJwtToken = function () {
	// jwt is assigning token based on the current user id so later on we can find the id with assocoited token
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// match password with hash
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compareSync(enteredPassword, this.password);
};

// generate reset password token
userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resertPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resertPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 mins * 60 sec * 1000 ms

	return resetToken;
};

module.exports = moongoose.model("User", userSchema);
