// db.js
const mysql = require('mysql');
const logger = require("../utils/logger");
const { DatabaseError } = require('../errors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sinan',
    password: '@dmin',
    database: 'finovo',
    port: '3306'
});

const connectDB = async () => {
    try {
        connection.connect((err) => {
            if (err) {
                throw new DatabaseError(err.message);
            }
            logger.info("MySQL database connection established!")
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { connection, connectDB }
