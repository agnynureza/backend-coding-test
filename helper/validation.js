const constant = require('./constant');

/**
 * payload validation
 * @param {object} obj
 * @returns {object} returns object error
 */

module.exports = (obj) => {
    if (obj.startLatitude < -90 || obj.startLatitude > 90 || obj.startLongitude < -180 || obj.startLongitude > 180) {
        const errorObj = {
            error_code: constant.VALIDATION_ERROR,
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
        };
        throw errorObj;
    }

    if (obj.endLatitude < -90 || obj.endLatitude > 90 || obj.endLongitude < -180 || obj.endLongitude > 180) {
        const errorObj = {
            error_code: constant.VALIDATION_ERROR,
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
        };
        throw errorObj;
    }

    if (typeof obj.riderName !== 'string' || obj.riderName.length < 1) {
        const errorObj = {
            error_code: constant.VALIDATION_ERROR,
            message: 'Rider name must be a non empty string',
        };
        throw errorObj;
    }

    if (typeof obj.driverName !== 'string' || obj.driverName.length < 1) {
        const errorObj = {
            error_code: constant.VALIDATION_ERROR,
            message: 'Driver name must be a non empty string',
        };
        throw errorObj;
    }

    if (typeof obj.driverVehicle !== 'string' || obj.driverVehicle.length < 1) {
        const errorObj = {
            error_code: constant.VALIDATION_ERROR,
            message: 'Driver vehicle must be a non empty string',
        };
        throw errorObj;
    }
};
