const express = require("express");
const router = express.Router();

const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoiceStatus,
} = require("../controllers/invoiceController");

router
  .route("/")
  .get(verifyJwtToken, getAllInvoices)
  .post(verifyJwtToken, createInvoice);

router
  .route("/:id")
  .get(verifyJwtToken, getSingleInvoice)
  .delete(verifyJwtToken, deleteInvoice);

router.route("/:id/status").patch(verifyJwtToken, updateInvoiceStatus);

module.exports = router;
