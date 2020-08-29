'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 8010;
const winston = require('winston');

const sqlite3 = require('sqlite3').verbose();



const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

// logger configuration
const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: './logs/example-1.log',
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

  const app = require('./src/app')(db, logger);

  app.listen(port, () => console.log(`App started and listening on port ${port}`));
});
