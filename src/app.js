const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
const helper = require('./helper');

module.exports = (db, logger) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            logger.error('Validation error start latitude or start longitude');
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            logger.error('Validation error end latitude or end longitude');
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            logger.error('Validation error rider name empty');
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            logger.error('Validation error driver name empty');
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR',
                message: 'Driver name must be a non empty string',
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            logger.error('Validation error driver vehicle empty');
            return res.status(400).send({
                error_code: 'VALIDATION_ERROR',
                message: 'Driver vehicle must be a non empty string',
            });
        }
        const values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverName];
        db.run(`INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, values, function (err) {
            if (err) {
                logger.error('Server error : ', err);
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error',
                });
            }
            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (err, rows) => {
                if (err) {
                    logger.error('Server error : ', err);
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error',
                    });
                }
                logger.info('Success create ride data');
                return res.send(rows);
            });
        });
    });

    app.get('/rides', (req, res) => {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        db.all('SELECT * FROM Rides', (err, rows) => {
            if (err) {
                logger.error('Server error : ', err);
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error',
                });
            }

            if (rows.length === 0) {
                logger.warn('Data Not Found');
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides',
                });
            }
            rows = helper.pagination(page, limit, rows);
            logger.info('Success Retrieve All Data Ride');
            return res.send(rows);
        });
    });

    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
            if (err) {
                logger.error('Server error : ', err);
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error',
                });
            }

            if (rows.length === 0) {
                logger.warn('Data Not Found');
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides',
                });
            }
            logger.info('Success Retrieve Data Ride');
            return res.send(rows);
        });
    });
    return app;
};
