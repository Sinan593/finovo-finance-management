const express = require("express");
const router = express.Router();

const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const {
  getAllInvoiceItems,
  createInvoiceItem,
  deleteInvoiceItems,
} = require("../controllers/invoiceItemsController");

router
  .route("/:id")
  .get(verifyJwtToken, getAllInvoiceItems)
  .delete(verifyJwtToken, deleteInvoiceItems);

router.route("/:invoiceId/:productId").post(verifyJwtToken, createInvoiceItem);

module.exports = router;
