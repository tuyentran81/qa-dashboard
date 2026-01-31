import * as executionService from '../../services/executionService.js';
import { query } from '../../db/connection.js';

// Mock the database connection
jest.mock('../../db/connection.js');

describe('ExecutionService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getExecutionTestCases', () => {
        it('should return test cases with default pagination', async () => {
            const mockRows = [
                {
                    id: 'TC-1001',
                    name: 'Authentication - Test Functionality 1',
                    module: 'Authentication',
                    type: 'Automation',
                    status: 'Passed',
                    duration: '2.5s',
                    executed_at: new Date('2024-01-15'),
                },
            ];

            query.mockResolvedValueOnce({ rows: mockRows });

            const result = await executionService.getExecutionTestCases();

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: 'TC-1001',
                name: 'Authentication - Test Functionality 1',
                module: 'Authentication',
                type: 'Automation',
                status: 'Passed',
                duration: '2.5s',
                executedAt: '2024-01-15',
            });
            expect(query).toHaveBeenCalledTimes(1);
        });

        it('should support pagination parameters', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            await executionService.getExecutionTestCases(2, 50);

            expect(query).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([50, 50]) // limit and offset
            );
        });

        it('should support filtering by status', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            await executionService.getExecutionTestCases(1, 250, { status: 'Failed' });

            const call = query.mock.calls[0];
            expect(call[0]).toContain('te.status = $1');
            expect(call[1]).toContain('Failed');
        });

        it('should support filtering by type', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            await executionService.getExecutionTestCases(1, 250, { type: 'Automation' });

            const call = query.mock.calls[0];
            expect(call[0]).toContain('tc.type = $1');
            expect(call[1]).toContain('Automation');
        });

        it('should support filtering by module', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            await executionService.getExecutionTestCases(1, 250, { module: 'Authentication' });

            const call = query.mock.calls[0];
            expect(call[0]).toContain('tc.module = $1');
            expect(call[1]).toContain('Authentication');
        });

        it('should handle database errors', async () => {
            query.mockRejectedValueOnce(new Error('Database error'));

            await expect(executionService.getExecutionTestCases()).rejects.toThrow('Database error');
        });
    });

    describe('getExecutionHistory', () => {
        it('should return execution history', async () => {
            const mockRows = [
                {
                    id: 1,
                    build: '#1056',
                    branch: 'main',
                    env: 'Production',
                    status: 'Passed',
                    duration: '15m 30s',
                    triggered_by: 'Schedule',
                },
                {
                    id: 2,
                    build: '#1055',
                    branch: 'feature/login',
                    env: 'Staging',
                    status: 'Failed',
                    duration: '12m 45s',
                    triggered_by: 'John Doe',
                },
            ];

            query.mockResolvedValueOnce({ rows: mockRows });

            const result = await executionService.getExecutionHistory();

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: 1,
                build: '#1056',
                branch: 'main',
                env: 'Production',
                status: 'Passed',
                duration: '15m 30s',
                triggeredBy: 'Schedule',
            });
            expect(query).toHaveBeenCalledTimes(1);
        });

        it('should handle null environment', async () => {
            const mockRows = [
                {
                    id: 1,
                    build: '#1056',
                    branch: 'main',
                    env: null,
                    status: 'Passed',
                    duration: '15m 30s',
                    triggered_by: 'Schedule',
                },
            ];

            query.mockResolvedValueOnce({ rows: mockRows });

            const result = await executionService.getExecutionHistory();

            expect(result[0].env).toBe('N/A');
        });

        it('should handle database errors', async () => {
            query.mockRejectedValueOnce(new Error('Database error'));

            await expect(executionService.getExecutionHistory()).rejects.toThrow('Database error');
        });
    });
});
