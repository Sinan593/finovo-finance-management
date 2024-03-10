const util = require("util");

const logger = require("../utils/logger");
const { connection } = require("../db/connectDB");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, DatabaseError } = require("../errors");

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

module.exports = { getSalesByDate, getMonthlySales };
