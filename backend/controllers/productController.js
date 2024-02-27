const util = require("util");

const logger = require("../utils/logger");
const { connection } = require("../db/connectDB");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, DatabaseError } = require("../errors");

const asyncQuery = util.promisify(connection.query).bind(connection);

const getAllProducts = async (req, res, next) => {
  try {
    const userId = req.body.user.id;
    const productsList = await asyncQuery(
      `SELECT * FROM products where user_id = ?`,
      userId
    );
    res.status(StatusCodes.OK).json({
      hits: productsList.length,
      products: productsList,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.body.user.id;

    let product;
    try {
      product = await asyncQuery(
        `SELECT * FROM products WHERE id = ? and user_id  = ?`,
        [productId, userId]
      );
    } catch (error) {
      throw new DatabaseError(error.message);
    }

    if (!product) {
      throw new BadRequestError("No product found!");
    }

    res.status(StatusCodes.OK).json({
      product: product[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.body.user.id;

    try {
      await asyncQuery(`DELETE FROM products WHERE id = ? and user_id = ?`, [
        productId,
        userId,
      ]);
    } catch (error) {
      throw new DatabaseError(error.message);
    }

    res.status(StatusCodes.OK).json({
      success: "Product removed from inventory!",
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      brand,
      stock,
      cost_price,
      selling_price,
      discount_rate,
      tax_rate,
    } = req.body;

    const userId = req.body.user.id;

    const processedStock = stock || 0;
    const processedDiscountRate = discount_rate || 0;
    const processedTaxRate = tax_rate || 0;

    let product;
    try {
      product = await asyncQuery(`INSERT INTO products SET ?`, {
        user_id: userId,
        name,
        category,
        brand,
        stock: processedStock,
        cost_price,
        selling_price,
        discount_rate: processedDiscountRate,
        tax_rate: processedTaxRate,
      });
    } catch (error) {
      throw new DatabaseError(error.message);
    }

    res.status(StatusCodes.CREATED).json({
      success: product,
    });
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.body.user.id;

    const {
      name,
      category,
      brand,
      stock,
      cost_price,
      selling_price,
      discount_rate,
      tax_rate,
    } = req.body;

    const processedStock = stock || 0;
    const processedDiscountRate = discount_rate || 0;
    const processedTaxRate = tax_rate || 0;

    logger.debug(`userID = ${userId} and productID = ${productId}`);

    let product;
    try {
      product = await asyncQuery(
        `UPDATE products SET ? WHERE id = ? and user_id = ?`,
        [
          {
            name,
            category,
            brand,
            stock: processedStock,
            cost_price,
            selling_price,
            discount_rate: processedDiscountRate,
            tax_rate: processedTaxRate,
          },
          productId,
          userId,
        ]
      );

      res.status(StatusCodes.OK).json({
        success: product,
      });
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  deleteProduct,
  editProduct,
};
