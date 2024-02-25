const { StatusCodes } = require("http-status-codes")

const NotFoundResponse = async (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: `The requested resource at path ${req.path} does not exist!`,
        status: StatusCodes.NOT_FOUND
    })
}



module.exports = { NotFoundResponse }