const express = require("express");
const {
  getSalesByDate,
  getMonthlySales,
} = require("../controllers/dashboardController");
const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const router = express.Router();

router.route("/salesByDate").get(verifyJwtToken, getSalesByDate);
router.route("/monthlySales").get(verifyJwtToken, getMonthlySales);

module.exports = router;
