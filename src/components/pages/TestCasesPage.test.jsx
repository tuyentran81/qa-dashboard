import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestCasesPage from './TestCasesPage';
import * as mockDataService from '../../data/mockData';

vi.mock('../../data/mockData', () => ({
    getExecutionTestCases: vi.fn(),
}));

describe('TestCasesPage', () => {
    it('renders test cases table', () => {
        const mockData = [
            { id: 'TC-1', name: 'Test 1', module: 'Auth', type: 'Automation', status: 'Passed', duration: '1s', executedAt: '2023-01-01' },
            { id: 'TC-2', name: 'Test 2', module: 'Pay', type: 'Manual', status: 'Failed', duration: '-', executedAt: '2023-01-01' },
        ];
        mockDataService.getExecutionTestCases.mockReturnValue(mockData);

        render(<TestCasesPage />);

        expect(screen.getByText('All Test Cases')).toBeInTheDocument();
        expect(screen.getByText('TC-1')).toBeInTheDocument();
        expect(screen.getByText('Test 1')).toBeInTheDocument();
        expect(screen.getByText('TC-2')).toBeInTheDocument();
        expect(screen.getByText('Failed')).toBeInTheDocument();
    });
});
