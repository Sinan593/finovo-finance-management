const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }

}

module.exports = UnauthenticatedError