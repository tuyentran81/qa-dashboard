import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
    describe('GET /health', () => {
        it('should return health status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
        });
    });

    describe('GET /api/overview', () => {
        it('should return overview metrics', async () => {
            const res = await request(app).get('/api/overview');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('totalTestCases');
            expect(res.body).toHaveProperty('automationCount');
            expect(res.body).toHaveProperty('manualCount');
            expect(res.body).toHaveProperty('passRate');
            expect(res.body).toHaveProperty('totalBuilds');
        });
    });

    describe('GET /api/automation-vs-manual', () => {
        it('should return automation vs manual data', async () => {
            const res = await request(app).get('/api/automation-vs-manual');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('name');
                expect(res.body[0]).toHaveProperty('value');
                expect(res.body[0]).toHaveProperty('color');
            }
        });
    });

    describe('GET /api/environment-stats', () => {
        it('should return environment statistics', async () => {
            const res = await request(app).get('/api/environment-stats');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('name');
                expect(res.body[0]).toHaveProperty('tests');
                expect(res.body[0]).toHaveProperty('pass');
                expect(res.body[0]).toHaveProperty('fail');
            }
        });
    });

    describe('GET /api/build-stats', () => {
        it('should return build statistics', async () => {
            const res = await request(app).get('/api/build-stats');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('build');
                expect(res.body[0]).toHaveProperty('total');
                expect(res.body[0]).toHaveProperty('passed');
                expect(res.body[0]).toHaveProperty('failed');
            }
        });
    });

    describe('GET /api/flaky-tests', () => {
        it('should return flaky tests data', async () => {
            const res = await request(app).get('/api/flaky-tests');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('percentage');
            expect(res.body).toHaveProperty('topFlaky');
            expect(Array.isArray(res.body.topFlaky)).toBe(true);
        });
    });

    describe('GET /api/new-test-cases-trend', () => {
        it('should return new test cases trend with default filter', async () => {
            const res = await request(app).get('/api/new-test-cases-trend');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should return new test cases trend with 7d filter', async () => {
            const res = await request(app).get('/api/new-test-cases-trend?filter=7d');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should return new test cases trend with quarter filter', async () => {
            const res = await request(app).get('/api/new-test-cases-trend?filter=quarter');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/test-cases', () => {
        it('should return test cases list', async () => {
            const res = await request(app).get('/api/test-cases');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should support pagination', async () => {
            const res = await request(app).get('/api/test-cases?page=1&limit=10');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeLessThanOrEqual(10);
        });

        it('should support filtering by status', async () => {
            const res = await request(app).get('/api/test-cases?status=Passed');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/execution-history', () => {
        it('should return execution history', async () => {
            const res = await request(app).get('/api/execution-history');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/failure-distribution', () => {
        it('should return failure distribution', async () => {
            const res = await request(app).get('/api/failure-distribution');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('404 handler', () => {
        it('should return 404 for unknown routes', async () => {
            const res = await request(app).get('/api/unknown-route');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });
});
