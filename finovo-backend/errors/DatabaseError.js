const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class DatabaseError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.name = "MySQL Error"
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

}

module.exports = DatabaseError