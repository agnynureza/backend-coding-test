const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const mock = require('./api.mock');
const app = require('../src/app')(db, mock.logger());
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return ride object', (done) => {
            request(app)
                .get('/rides')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return ride object', (done) => {
            request(app)
                .get('/rides/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return ride object', (done) => {
            request(app)
                .post('/rides')
                .send(mock.requestBody)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
        });
        it('should return validation error start latitude', (done) => {
            const mockStartLat = { ...mock.requestBody };
            mockStartLat.start_lat = 9999;
            request(app)
                .post('/rides')
                .send(mockStartLat)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorStartLatLong, done);
        });
        it('should return validation error start longitude', (done) => {
            const mockStartLong = { ...mock.requestBody };
            mockStartLong.start_long = 9999;
            request(app)
                .post('/rides')
                .send(mockStartLong)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorStartLatLong, done);
        });
        it('should return validation error end latitude', (done) => {
            const mockEndLat = { ...mock.requestBody };
            mockEndLat.end_lat = 9999;
            request(app)
                .post('/rides')
                .send(mockEndLat)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorEndLatLong, done);
        });
        it('should return validation error end longitude', (done) => {
            const mockEndLong = { ...mock.requestBody };
            mockEndLong.end_long = 9999;
            request(app)
                .post('/rides')
                .send(mockEndLong)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorEndLatLong, done);
        });
        it('should return validation error rider name', (done) => {
            const mockRiderName = { ...mock.requestBody };
            mockRiderName.rider_name = '';
            request(app)
                .post('/rides')
                .send(mockRiderName)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorRider, done);
        });
        it('should return validation error driver name', (done) => {
            const mockDriverName = { ...mock.requestBody };
            mockDriverName.driver_name = '';
            request(app)
                .post('/rides')
                .send(mockDriverName)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorDriverName, done);
        });
        it('should return validation error driver vehicle', (done) => {
            const mockDriverVehicle = { ...mock.requestBody };
            mockDriverVehicle.driver_vehicle = '';
            request(app)
                .post('/rides')
                .send(mockDriverVehicle)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400, mock.responErrorDriverVehicle, done);
        });
    });
});
