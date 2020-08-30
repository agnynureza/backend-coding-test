module.exports = {
    createRide: async (db, params) => {
        try {
            const queryInsert = `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
            await db.query(queryInsert, params);
        } catch (err) {
            !err.message ? err.message = 'Unexpected Server Error' : '';
            throw err;
        }
    },
    lastInsert: async (db, params) => {
        try {
            const queryInsert = 'SELECT last_insert_rowid() FROM Rides';
            return await db.query(queryInsert, params);
        } catch (err) {
            !err.message ? err.message = 'Unexpected Server Error' : '';
            throw err;
        }
    },
    selectRideByID: async (db, params) => {
        try {
            const queryInsert = 'SELECT * FROM Rides WHERE rideID = $1';
            const row = await db.query(queryInsert, params);
            if (row.rows.length === 0) {
                const notFound = {
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides',
                };
                return notFound;
            }
            return row.rows[0];
        } catch (err) {
            !err.message ? err.message = 'Unexpected Server Error' : '';
            throw err;
        }
    },
    selectAllRider: async (db, params) => {
        try {
            const queryInsert = 'SELECT * FROM Rides';
            const rows = await db.query(queryInsert, params);

            if (rows.rows.length === 0) {
                const notFound = {
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides',
                };
                return notFound;
            }
            return rows.rows;
        } catch (err) {
            !err.message ? err.message = 'Unexpected Server Error' : '';
            throw err;
        }
    },
};
