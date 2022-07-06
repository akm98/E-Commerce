const express = require("express");
const {
	getAllProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getSingleProduct,
} = require("../Controller/productController");
const { isUserAuthenticated, authorizeRoles } = require("../Middleware/auth");
console.log(typeof isUserAuthenticated, typeof authorizeRoles);
const router = express.Router();

router.route("/products").get(getAllProduct);
router
	.route("/products/new")
	.post(isUserAuthenticated, authorizeRoles("admin"), createProduct);
router
	.route("/products/:id")
	.put(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
	.delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct)
	.get(getSingleProduct);

module.exports = router;
