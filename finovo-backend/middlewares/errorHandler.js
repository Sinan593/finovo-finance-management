const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");
const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    // Log detailed information for CustomAPIError
    logger.debug(`CustomAPIError: ${error.message}`, {
      name: error.name,
      status: error.status,
      stack: error.stack,
    });

    res.status(error.status).json({
      success: false,
      error: {
        message: error.message,
        status: error.status,
      },
    });
  } else {
    // Log generic error information
    logger.error(`Unhandled Error: ${error.message}`, {
      name: error.name,
      stack: error.stack,
    });

    // Handle unexpected errors gracefully
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        message: "Something went wrong!",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

module.exports = errorHandler;
