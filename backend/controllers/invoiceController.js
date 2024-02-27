const util = require("util");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, DatabaseError } = require("../errors");
const { connection } = require("../db/connectDB");
const logger = require("../utils/logger");

const asyncQuery = util.promisify(connection.query).bind(connection);

const getAllInvoices = async (req, res, next) => {
  try {
    const userId = req.body.user.id;

    const invoices = await asyncQuery(
      `SELECT * FROM invoices WHERE user_id = ?`,
      userId
    );
    res
      .status(StatusCodes.OK)
      .json({ success: true, data: { hits: invoices.length, invoices } });
  } catch (error) {
    next(error);
  }
};

const getSingleInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const userId = req.body.user.id;
    const invoice = await asyncQuery(
      `SELECT * FROM invoices WHERE id = ? AND user_id = ?`,
      [invoiceId, userId]
    );

    if (!invoice.length) {
      throw new BadRequestError("Invoice not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ success: true, data: { invoice: invoice[0] } });
  } catch (error) {
    next(error);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const userId = req.body.user.id;

    const { customer_name } = req.body;
    const { subtotal, total, tax } = 0;
    const payment_status = "unpaid";

    // Set up a unique reference number according to current date and time
    const date = new Date();
    const reference_number = `INV-${String(date.getDate()).padStart(
      2,
      "0"
    )}${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}${date.getFullYear()}${String(date.getHours()).padStart(2, "0")}${String(
      date.getMinutes()
    ).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}${String(
      date.getMilliseconds()
    ).padStart(3, "0")}`;

    const processedDate = date.toISOString().slice(0, 19).replace("T", " ");

    logger.debug(reference_number);

    const insert = `INSERT INTO invoices SET ?`;

    const invoice = await asyncQuery(insert, [
      {
        user_id: userId,
        reference_number,
        date: processedDate,
        customer_name,
        subtotal,
        tax,
        total,
        payment_status,
      },
    ]);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        invoiceId: invoice.insertId,
        message: "Invoice created succesfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;
    const userId = req.body.user.id;

    logger.debug(`invoiceID = ${invoiceId} and user ID = ${userId}`);

    const product = await asyncQuery(
      `DELETE FROM invoices WHERE id = ? and user_id = ?`,
      [invoiceId, userId]
    );

    if (product.affectedRows < 1) {
      throw new BadRequestError(
        "Failed to delete the invoices. Please ensure that all required fields are provided and try again."
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        affectedRows: product.affectedRows,
        message: "Invoice deleted successfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  deleteInvoice,
};
