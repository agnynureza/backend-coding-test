const request = require('supertest');

const expect = require('chai').expect;

const db = require('../db/dbQuery');

const mock = require('./api.mock');
const app = require('../src/app')(db, mock.logger());
const buildSchemas = require('../src/schemas')();
const helper = require('../helper/helper');
const model = require('../src/model');

describe('API tests', () => {
    before(async () => {
        try {
            await db.query(buildSchemas, []);
        } catch (err) {
            return err;
        }
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
                .get('/rides/abc')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
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

    describe('Test helper pagination', () => {
        it('should return data 1 and 2', (done) => {
            const data = helper.pagination(mock.mockPage, mock.mockLimit, mock.mockTotalData);
            expect(data.totalData).to.equal(mock.mockExpectTotalData);
            expect(data.pageCount).to.equal(mock.mockExpectPageCount);
            expect(data.offset).to.equal(mock.mockOffset);
            done();
        });
        it('should return all data', (done) => {
            const data = helper.pagination(undefined, undefined, mock.mockTotalData);
            expect(data.totalData).to.equal(mock.mockExpectTotalData);
            expect(data.pageCount).to.equal(mock.mockExpectPageCountAllData);
            done();
        });
        it('should return last page', (done) => {
            const data = helper.pagination(mock.mockPageLast, mock.mockLimit, mock.mockTotalData);
            expect(data.totalData).to.equal(mock.mockExpectTotalData);
            expect(data.pageCount).to.equal(mock.mockExpectPageCount);
            done();
        });
    });

    describe('Test model query', () => {
        it('should throw error create rider', async () => {
            try {
                await model.createRide(db, 'should be error');
            } catch (err) {
                expect(err).to.equal(mock.mockErrorMessage);
            }
        });
        it('should throw error last insert', async () => {
            try {
                await model.lastInsert(db, 'should be error');
            } catch (err) {
                expect(err).to.equal(mock.mockErrorMessage);
            }
        });
        it('should throw error select rider by id', async () => {
            try {
                await model.selectRideByID(db, 'should be error');
            } catch (err) {
                expect(err).to.equal(mock.mockErrorMessage);
            }
        });
        it('should throw error count all data', async () => {
            try {
                await model.countAllData(db, 'should be error');
            } catch (err) {
                expect(err).to.equal(mock.mockErrorMessage);
            }
        });
        it('should throw error select pagination', async () => {
            try {
                await model.selectPagination(db, 'should be error');
            } catch (err) {
                expect(err).to.equal(mock.mockErrorMessage);
            }
        });
    });
});
