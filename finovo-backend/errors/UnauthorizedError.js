const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.FORBIDDEN;
    }

}

module.exports = UnauthorizedError