const util = require("util");

const logger = require("../utils/logger");
const { connection } = require("../db/connectDB");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, DatabaseError } = require("../errors");

const asyncQuery = util.promisify(connection.query).bind(connection);

const getAllInvoiceItems = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;

    if (!invoiceId) {
      throw new BadRequestError("Invoice ID is required");
    }

    const query = `SELECT p.name, quantity, unit_price, discount, subtotal, tax, total
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
    `;

    const invoiceItemsList = await asyncQuery(query, invoiceId);

    res
      .status(StatusCodes.OK)
      .json({ success: true, data: { invoiceItems: invoiceItemsList } });
  } catch (error) {
    next(error);
  }
};

const createInvoiceItem = async (req, res, next) => {
  try {
    const userId = req.body.user.id;

    const invoiceId = req.params.invoiceId;
    const productId = req.params.productId;

    logger.debug(
      `User ID : ${userId} and invoice ID : ${invoiceId} and product ID : ${productId}`
    );

    if (!invoiceId || !productId) {
      throw new BadRequestError("Invoice ID or Product ID is required!");
    }

    const { quantity } = req.body;
    if (!quantity) {
      throw new BadRequestError("Product Quantity is required!");
    }

    //Get the quantity from client and rest all calculations are done in backend
    const invoice = await asyncQuery(
      `SELECT * FROM invoices WHERE id = ?`,
      invoiceId
    );

    if (!invoice) {
      throw new BadRequestError("NO such invoice exists!");
    }

    const product = await asyncQuery(
      `SELECT * FROM products WHERE id = ?`,
      productId
    );

    if (!product) {
      throw new BadRequestError("NO such product exists!");
    }

    logger.debug(JSON.stringify(product[0]));

    if (product[0].stock === 0 || product[0].stock - quantity < 0) {
      throw new BadRequestError("The product has run out of stock!");
    }

    await asyncQuery(
      `UPDATE products SET stock = stock - ? WHERE id = ? and user_id = ?`,
      [quantity, productId, userId]
    );

    const discount = product[0].selling_price * product[0].discount_rate;
    const unit_price = product[0].selling_price - discount;
    const subtotal = unit_price * quantity;
    const tax = subtotal * product[0].tax_rate;
    const total = subtotal + tax;

    const insert = `INSERT INTO invoice_items SET ?`;

    const result = await asyncQuery(insert, {
      invoice_id: invoiceId,
      product_id: productId,
      quantity,
      unit_price,
      discount,
      subtotal,
      tax,
      total,
    });

    logger.debug(JSON.stringify(result));
    logger.debug(JSON.stringify(result.insertId));

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        invoiceItemId: result.insertId,
        message: "Invoice Item added successfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteInvoiceItems = async (req, res, next) => {
  try {
    const invoiceId = req.params.id;

    if (!invoiceId) {
      throw new BadRequestError("Invoice ID is required!");
    }

    const query = `DELETE FROM invoice_items WHERE invoice_id = ?`;

    const invoiceItems = await asyncQuery(query, invoiceId);

    if (invoiceItems.affectedRows < 1) {
      throw new BadRequestError(
        "Failed to delete the invoice items. Please ensure that all required fields are provided and try again."
      );
    }

    res.status(StatusCodes.NO_CONTENT).json({
      success: true,
      data: {
        affectedRows: invoiceItems.affectedRows,
        message: "Invoice Item deleted successfully!",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInvoiceItems,
  createInvoiceItem,
  deleteInvoiceItems,
};
