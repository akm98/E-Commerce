const express = require('express');
const {
  registerUser,
  getAllUsers,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  getSingleUser,
  getCurrentUserDetails,
  updatePassowrd,
  updateProfile,
  updateUser,
} = require('../Controller/userController');
const { isUserAuthenticated, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route('/user/register').post(registerUser);

router
  .route('/admin/getAllUser')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAllUsers);

router
  .route('/admin/user/:id')
  .get(isUserAuthenticated, authorizeRoles('admin'), getSingleUser)
  .put(isUserAuthenticated, authorizeRoles('admin'), updateUser);

router.route('/user/me').get(isUserAuthenticated, getCurrentUserDetails);
router.route('/user/me/update').put(isUserAuthenticated, updateProfile);
router.route('/user/login').post(userLogin);
router.route('/user/logout').get(logout);
router.route('/user/password/forgot').post(forgotPassword);
router.route('/user/password/update').put(isUserAuthenticated, updatePassowrd);
router.route('/password/reset/:token').put(resetPassword);
module.exports = router;
