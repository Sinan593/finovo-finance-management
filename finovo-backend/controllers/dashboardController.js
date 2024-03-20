const util = require("util");

const logger = require("../utils/logger");
const { connection } = require("../db/connectDB");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, DatabaseError } = require("../errors");
const { log } = require("console");

const asyncQuery = util.promisify(connection.query).bind(connection);

const getSalesByDate = async (req, res, next) => {
  try {
    const id = req.body.user.id;

    const salesByDateList = await asyncQuery(
      `SELECT DATE(date) AS date, SUM(total) AS total_sales
                        FROM invoices where user_id = ?
                        GROUP BY DATE(date)
                        ORDER BY DATE(date);`,
      [id]
    );
    logger.debug(salesByDateList);

    res.status(StatusCodes.OK).json(salesByDateList);
  } catch (error) {
    next(error);
  }
};

const getMonthlySales = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const response = await asyncQuery(
      `SELECT SUM(total) AS total_sales
                                      FROM invoices
                                      WHERE user_id = ? AND date > NOW() - INTERVAL 30 DAY;`,
      [id]
    );

    logger.debug(JSON.stringify(response));

    res
      .status(StatusCodes.OK)
      .json({ success: true, data: { total_sales: response[0].total_sales } });
  } catch (error) {
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const notifications = await asyncQuery(
      `select * from notifications where user_id = ?`,
      [id]
    );

    logger.debug(JSON.stringify(notifications));

    res.status(StatusCodes.OK).json({ success: true, data: { notifications } });
  } catch (error) {
    next(error);
  }
};

const getYearlyProfit = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const yearlyProfits = await asyncQuery(
      `SELECT 
    DATE_FORMAT(i.date, '%Y-%m') AS month,
    SUM(p.selling_price * ii.quantity - p.cost_price * ii.quantity) AS monthly_profit
FROM 
    invoices i
JOIN 
    invoice_items ii ON i.id = ii.invoice_id
JOIN 
    products p ON ii.product_id = p.id
WHERE 
    i.payment_status = 'paid'
    AND i.user_id = ?
GROUP BY 
    DATE_FORMAT(i.date, '%Y-%m');
`,
      [id]
    );

    logger.debug(JSON.stringify(yearlyProfits));

    res.status(StatusCodes.OK).json({ success: true, data: { yearlyProfits } });
  } catch (error) {
    next(error);
  }
};

const getInvoiceDetails = async (req, res, next) => {
  try {
    const id = req.body.user.id;
    const result = await asyncQuery(
      `SELECT 
    SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) AS paid,
    SUM(CASE WHEN payment_status = 'unpaid' THEN 1 ELSE 0 END) AS unpaid
FROM 
    invoices
WHERE 
    user_id = ?;
`,
      [id]
    );
    logger.debug(JSON.stringify(result));

    res.status(StatusCodes.OK).json({ invoice_details: result[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesByDate,
  getMonthlySales,
  getNotifications,
  getYearlyProfit,
  getInvoiceDetails,
};
