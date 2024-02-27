const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const verifyJwtToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthenticatedError("Plese sign-in to continue!");
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthenticatedError("Token expired. Please sign in again!");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new UnauthenticatedError("Invalid token. Please sign in again!");
      } else {
        throw err; // throw other types of errors
      }
    }

    if (!payload) {
      throw new UnauthenticatedError(
        "Invalid user! Please sign-in to continue."
      );
    }

    req.body.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyJwtToken };
