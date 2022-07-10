const express = require('express');
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createUpdateProductReview,
  getProductReviews,
  deleteReview,
} = require('../Controller/productController');
const { isUserAuthenticated, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProduct);
router
  .route('/products/new')
  .post(isUserAuthenticated, authorizeRoles('admin'), createProduct);
router
  .route('/products/product/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct)
  .get(getSingleProduct);
router
  .route('/products/review/:id')
  .put(isUserAuthenticated, createUpdateProductReview)
  .get(isUserAuthenticated, authorizeRoles('admin'), getProductReviews)
  .delete(isUserAuthenticated, deleteReview);
module.exports = router;
