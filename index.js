const express = require('express');

const winston = require('winston');

const sqlite3 = require('sqlite3').verbose();

const app = express();

const port = process.env.PORT || 8010;

const buildSchemas = require('./src/schemas');

const db = new sqlite3.Database(':memory:');

const route = require('./src/app');

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

db.serialize(() => {
    buildSchemas(db);

    app.use(route(db, logger));
    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
