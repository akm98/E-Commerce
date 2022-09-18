const express = require("express");
const {
	processPayment,
	sendStripeApiKey,
} = require("../Controller/paymentController");
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require("../Middleware/auth");

router.route("/payment/process").post(isUserAuthenticated, processPayment);
router.route("/stripeApiKey").post(isUserAuthenticated, sendStripeApiKey);

module.exports = router;
