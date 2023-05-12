const express = require("express");
const {
  createProduct,
  getAllproduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/productConroller");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllproduct);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .get(getProductDetails);

router.route('/product/:id').get(getProductDetails)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
module.exports = router;
