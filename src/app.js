const express = require('express');
const bodyParser = require('body-parser');
const constant = require('../helper/constant');
const helper = require('../helper/helper');
const model = require('./model');

const app = express();
const jsonParser = bodyParser.json();
const validation = require('../helper/validation');

module.exports = (db, logger) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, async (req, res) => {
        try {
            const startLatitude = Number(req.body.start_lat);
            const startLongitude = Number(req.body.start_long);
            const endLatitude = Number(req.body.end_lat);
            const endLongitude = Number(req.body.end_long);
            const riderName = req.body.rider_name;
            const driverName = req.body.driver_name;
            const driverVehicle = req.body.driver_vehicle;

            // validation req.body
            validation({
                startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle,
            });

            // create ride data
            const paramsInsert = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];
            await model.createRide(db, paramsInsert);

            // get last insert row
            const lastIndex = await model.lastInsert(db, []);

            // select ride
            const paramsSelect = [lastIndex.rows[0]['last_insert_rowid()']];
            const row = await model.selectRideByID(db, paramsSelect);

            logger.info('Success Create Rider Data');
            return res.status(200).send(row);
        } catch (err) {
            let code;
            err.error_code === constant.VALIDATION_ERROR ? code = 400 : code = 500;

            logger.error(`${err.message}`);
            return res.status(code).send({
                error_code: err.error_code || err.code,
                message: err.message,
            });
        }
    });

    app.get('/rides', async (req, res) => {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);

            let rows = await model.selectAllRider(db, []);
            if (rows.error_code === constant.RIDES_NOT_FOUND) {
                logger.warn(rows.message);
            } else {
                rows = helper.pagination(page, limit, rows);
                logger.info('Success Retrieve All Data Ride');
            }

            return res.status(200).send(rows);
        } catch (err) {
            logger.error(`${err.message}`);
            return res.status(500).send({
                error_code: err.error_code || err.code,
                message: err.message,
            });
        }
    });

    app.get('/rides/:id', async (req, res) => {
        try {
            const id = [req.params.id];
            const row = await model.selectRideByID(db, id);
            if (row.error_code === constant.RIDES_NOT_FOUND) {
                logger.warn(row.message);
            } else {
                logger.info('Success Retrieve All Data Ride');
            }
            return res.status(200).send(row);
        } catch (err) {
            logger.error(`${err.message}`);
            return res.status(500).send({
                error_code: err.error_code || err.code,
                message: err.message,
            });
        }
    });

    return app;
};
