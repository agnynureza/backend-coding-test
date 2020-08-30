const express = require('express');

const logger = require('./logger/log');

const app = express();

const port = process.env.PORT || 8010;

const buildSchemas = require('./src/schemas')();

const route = require('./src/app');

const db = require('./db/dbQuery');

(async () => {
    try {
        await db.query(buildSchemas, []);
        app.use(route(db, logger));
        app.listen(port, () => logger.info(`App started and listening on port ${port}`));
    } catch (err) {
        logger.error('Server Error: ', err);
    }
})();
