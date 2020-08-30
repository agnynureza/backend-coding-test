const winston = require('winston');

module.exports = {
    requestBody: {
        start_lat: 80,
        start_long: 175,
        end_lat: 82,
        end_long: 178,
        rider_name: 'agny',
        driver_name: 'reza',
        driver_vehicle: 'car',
    },
    responErrorStartLatLong: {
        error_code: 'VALIDATION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    },
    responErrorEndLatLong: {
        error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    },
    responErrorRider: {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
    },
    responErrorDriverName: {
        error_code: 'VALIDATION_ERROR',
        message: 'Driver name must be a non empty string',
    },
    responErrorDriverVehicle: {
        error_code: 'VALIDATION_ERROR',
        message: 'Driver vehicle must be a non empty string',
    },
    mockErrorMessage: 'params is not an array!',
    mockPage: 1,
    mockPageLast: 99,
    mockLimit: 2,
    mockExpectPageCount: 2,
    mockExpectPageCountAllData: 1,
    mockExpectTotalData: 4,
    mockTotalData: 4,
    mockOffset: 0,
    mockGetAllData: [
        {
            rideID: 1,
            startLat: 80,
            startLong: 150,
            endLat: 82,
            endLong: 150,
            riderName: 'agny',
            driverName: 'reza',
            driverVehicle: 'car',
            created: '2020-08-30 12:45:39',
        },
        {
            rideID: 2,
            startLat: 80,
            startLong: 150,
            endLat: 82,
            endLong: 150,
            riderName: 'agny',
            driverName: 'reza',
            driverVehicle: 'car',
            created: '2020-08-30 12:45:40',
        },
        {
            rideID: 3,
            startLat: 80,
            startLong: 150,
            endLat: 82,
            endLong: 150,
            riderName: 'agny',
            driverName: 'reza',
            driverVehicle: 'car',
            created: '2020-08-30 12:45:40',
        },
        {
            rideID: 4,
            startLat: 80,
            startLong: 150,
            endLat: 82,
            endLong: 150,
            riderName: 'agny',
            driverName: 'reza',
            driverVehicle: 'car',
            created: '2020-08-30 12:45:41',
        },
    ],
    logger: () => {
        const logConfiguration = {
            transports: [
                new winston.transports.File({
                    filename: './logs/unit-test.log',
                }),
                new winston.transports.Console({
                    level: 'verbose',
                }),
            ],
        };
        return winston.createLogger(logConfiguration);
    },
};
