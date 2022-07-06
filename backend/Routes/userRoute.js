const express = require("express");
const {
	registerUser,
	getAllUsers,
	userLogin,
	logout,
	forgotPassword,
	resetPassword,
} = require("../Controller/userController");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/getAllUser").get(getAllUsers);
router.route("/user/login").post(userLogin);
router.route("/user/logout").get(logout);
router.route("/user/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
