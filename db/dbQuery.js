const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

/**
 *DB query
 *@param {string} queryText
 *@param {array} Params
 *@returns {object} object
*/

db.query = function (queryText, params) {
    if (!Array.isArray(params)) {
        const error = 'params is not an array!';
        throw error;
    }
    return new Promise((resolve, reject) => {
        this.all(queryText, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve({ rows });
            }
        });
    });
};

module.exports = db;
