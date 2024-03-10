const CustomAPIError = require("./CustomAPIError")
const BadRequestError = require("./BadRequestError")
const NotFoundError = require("./NotFoundError")
const UnauthenticatedError = require("./UnauthenticatedError")
const UnauthorizedError = require("./UnauthorizedError")
const DatabaseError = require("./DatabaseError")

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
    DatabaseError
}