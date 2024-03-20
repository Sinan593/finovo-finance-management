const express = require("express");
const {
  getSalesByDate,
  getMonthlySales,
  getNotifications,
  getYearlyProfit,
  getInvoiceDetails,
} = require("../controllers/dashboardController");
const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const router = express.Router();

router.route("/salesByDate").get(verifyJwtToken, getSalesByDate);
router.route("/monthlySales").get(verifyJwtToken, getMonthlySales);
router.route("/getAllNotifications").get(verifyJwtToken, getNotifications);
router.route("/getYearlyProfit").get(verifyJwtToken, getYearlyProfit);
router.route("/getInvoiceDetails").get(verifyJwtToken, getInvoiceDetails);

module.exports = router;
