const jwt = require("jsonwebtoken")

const generateJWTToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return token;
}


module.exports = { generateJWTToken }