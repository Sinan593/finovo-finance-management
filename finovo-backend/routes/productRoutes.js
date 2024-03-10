const express = require("express");
const router = express.Router();

const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/productController");

router
  .route("/")
  .get(verifyJwtToken, getAllProducts)
  .post(verifyJwtToken, addProduct);
router
  .route(`/:id`)
  .get(verifyJwtToken, getSingleProduct)
  .delete(verifyJwtToken, deleteProduct)
  .patch(verifyJwtToken, editProduct);

module.exports = router;
