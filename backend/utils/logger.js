// logger.js
const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

// Define log format
const logFormat = combine(
    timestamp(),
    colorize(),
    printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
);

// Create Winston logger with console and file transports
const logger = winston.createLogger({
    level: 'debug', // Set the minimum log level
    format: logFormat, // Apply the log format
    transports: [
        // Log errors to both console and file
        new winston.transports.Console({
            format: combine(winston.format.simple(), winston.format.colorize(), logFormat),
            level: 'error'
        }),
        new winston.transports.File({ filename: './error.log', level: 'error' }),

        // Log other levels (debug, info, etc.) to console only
        new winston.transports.Console({ format: combine(winston.format.simple(), logFormat) })
    ],
});

module.exports = logger;
