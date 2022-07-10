const express = require('express');
const {
  newOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getLoggedInUserOrders,
  getAllOrders,
} = require('../Controller/orderController');
const router = express.Router();
const { isUserAuthenticated, authorizeRoles } = require('../Middleware/auth');

router.route('/order/new').post(isUserAuthenticated, newOrder);
router.route('/order/:id').get(isUserAuthenticated, getSingleOrder);
router.route('/orders/me').get(isUserAuthenticated, getLoggedInUserOrders);
router
  .route('/admin/order/all')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAllOrders);
router
  .route('/admin/order/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateOrder)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder);

module.exports = router;
