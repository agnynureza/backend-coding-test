const winston = require('winston');

// logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.File({
            filename: './logs/dev-log.log',
        }),
        new winston.transports.Console({
            level: 'verbose',
        }),
    ],
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;
