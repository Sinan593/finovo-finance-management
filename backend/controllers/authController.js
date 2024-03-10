const { StatusCodes } = require("http-status-codes");
const { connection } = require("../db/connectDB");
const util = require("util");
const bcrypt = require("bcryptjs");
const {
  DatabaseError,
  UnauthenticatedError,
  BadRequestError,
} = require("../errors");
const logger = require("../utils/logger");
const { log } = require("console");
const { generateJWTToken } = require("../utils/jwt");

const asyncQuery = util.promisify(connection.query).bind(connection);

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = await asyncQuery(`SELECT * FROM users where email = ?`, [
      email,
    ]);

    if (user.length > 0) {
      throw new UnauthenticatedError(
        "This email already exists! Please use a different email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const result = await asyncQuery(`INSERT INTO users SET ?`, {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      created_at: createdAt,
    });

    const token = generateJWTToken({
      id: result.insertId,
      email,
      firstname,
      lastname,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if you are using HTTPS
      sameSite: "lax", // Set to 'none' for cross-origin requests
      domain: "localhost", // Set to your domain
    });

    res.status(StatusCodes.CREATED).json({ success: true, data: { token } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await asyncQuery(`SELECT * FROM users where email = ?`, [
      email,
    ]);

    if (user.length === 0) {
      throw new UnauthenticatedError(
        "The email does not exist! Please register."
      );
    }

    const isValidUser = await bcrypt.compare(password, user[0].password);
    if (!isValidUser) {
      throw new UnauthenticatedError("Invalid credentials!");
    }

    const token = generateJWTToken({
      id: user[0].id,
      email: user[0].email,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if you are using HTTPS
      sameSite: "lax", // Set to 'none' for cross-origin requests
      domain: "localhost", // Set to your domain
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
