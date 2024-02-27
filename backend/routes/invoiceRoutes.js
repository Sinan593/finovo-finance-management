const express = require("express");
const router = express.Router();

const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");

router
  .route("/")
  .get(verifyJwtToken, getAllInvoices)
  .post(verifyJwtToken, createInvoice);

router
  .route("/:id")
  .get(verifyJwtToken, getSingleInvoice)
  .delete(verifyJwtToken, deleteInvoice);

module.exports = router;
