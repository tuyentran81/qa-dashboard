import * as metricsService from '../../services/metricsService.js';
import { query } from '../../db/connection.js';

// Mock the database connection
jest.mock('../../db/connection.js');

describe('MetricsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOverviewMetrics', () => {
        it('should return overview metrics', async () => {
            query
                .mockResolvedValueOnce({ rows: [{ total: '2450' }] }) // total test cases
                .mockResolvedValueOnce({ rows: [{ count: '1850' }] }) // automation count
                .mockResolvedValueOnce({ rows: [{ count: '600' }] }) // manual count
                .mockResolvedValueOnce({ rows: [{ pass_rate: '98.2' }] }) // pass rate
                .mockResolvedValueOnce({ rows: [{ total: '142' }] }); // total builds

            const result = await metricsService.getOverviewMetrics();

            expect(result).toEqual({
                totalTestCases: 2450,
                automationCount: 1850,
                manualCount: 600,
                passRate: 98.2,
                totalBuilds: 142,
            });
            expect(query).toHaveBeenCalledTimes(5);
        });

        it('should handle database errors', async () => {
            query.mockRejectedValueOnce(new Error('Database error'));

            await expect(metricsService.getOverviewMetrics()).rejects.toThrow('Database error');
        });
    });

    describe('getAutomationVsManualData', () => {
        it('should return automation vs manual data', async () => {
            query.mockResolvedValueOnce({
                rows: [
                    { type: 'Automation', value: '1850' },
                    { type: 'Manual', value: '600' },
                ],
            });

            const result = await metricsService.getAutomationVsManualData();

            expect(result).toEqual([
                { name: 'Automation', value: 1850, color: 'var(--chart-auto)' },
                { name: 'Manual', value: 600, color: 'var(--chart-manual)' },
            ]);
            expect(query).toHaveBeenCalledTimes(1);
        });
    });

    describe('getEnvironmentStats', () => {
        it('should return environment statistics', async () => {
            query.mockResolvedValueOnce({
                rows: [
                    { name: 'Dev', tests: '1850', pass: '1800', fail: '50' },
                    { name: 'Staging', tests: '1850', pass: '1840', fail: '10' },
                    { name: 'Production', tests: '450', pass: '450', fail: '0' },
                ],
            });

            const result = await metricsService.getEnvironmentStats();

            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                name: 'Dev',
                tests: 1850,
                pass: 1800,
                fail: 50,
            });
            expect(query).toHaveBeenCalledTimes(1);
        });
    });

    describe('getBuildStats', () => {
        it('should return build statistics', async () => {
            query.mockResolvedValueOnce({
                rows: [
                    { build: '#110', total: '1800', passed: '1750', failed: '50' },
                    { build: '#109', total: '1770', passed: '1720', failed: '50' },
                ],
            });

            const result = await metricsService.getBuildStats();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('build');
            expect(result[0]).toHaveProperty('total');
            expect(result[0]).toHaveProperty('passed');
            expect(result[0]).toHaveProperty('failed');
            expect(query).toHaveBeenCalledTimes(1);
        });
    });

    describe('getFlakyTests', () => {
        it('should return flaky tests data', async () => {
            query
                .mockResolvedValueOnce({ rows: [{ percentage: '3.5' }] })
                .mockResolvedValueOnce({
                    rows: [
                        { id: 'TC-101', name: 'Checkout Payment Flow', flakiness: '12' },
                        { id: 'TC-204', name: 'User Registration via Email', flakiness: '8' },
                        { id: 'TC-405', name: 'Add to Cart Animation', flakiness: '5' },
                    ],
                });

            const result = await metricsService.getFlakyTests();

            expect(result).toEqual({
                percentage: 3.5,
                topFlaky: [
                    { id: 'TC-101', name: 'Checkout Payment Flow', flakiness: 12 },
                    { id: 'TC-204', name: 'User Registration via Email', flakiness: 8 },
                    { id: 'TC-405', name: 'Add to Cart Animation', flakiness: 5 },
                ],
            });
            expect(query).toHaveBeenCalledTimes(2);
        });
    });

    describe('getNewTestCasesTrend', () => {
        it('should return trend data for 30d filter', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            const result = await metricsService.getNewTestCasesTrend('30d');

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            if (result.length > 0) {
                expect(result[0]).toHaveProperty('date');
                expect(result[0]).toHaveProperty('newCases');
            }
        });

        it('should return trend data for 7d filter', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            const result = await metricsService.getNewTestCasesTrend('7d');

            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('getFailureDistribution', () => {
        it('should return failure distribution by module', async () => {
            query.mockResolvedValueOnce({
                rows: [
                    { name: 'Authentication', value: '15' },
                    { name: 'Checkout', value: '10' },
                    { name: 'Search', value: '8' },
                ],
            });

            const result = await metricsService.getFailureDistribution();

            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({ name: 'Authentication', value: 15 });
            expect(query).toHaveBeenCalledTimes(1);
        });
    });
});
