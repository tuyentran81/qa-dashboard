import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';
import * as exportUtils from './utils/exportUtils';


// Mock child components to simplify testing
vi.mock('./components/widgets/PieChartWidget', () => ({ default: () => <div>PieChartWidget</div> }));
vi.mock('./components/widgets/BarChartWidget', () => ({ default: () => <div>BarChartWidget</div> }));
vi.mock('./components/widgets/BuildTrendWidget', () => ({ default: () => <div>BuildTrendWidget</div> }));
vi.mock('./components/widgets/NewCasesTrendWidget', () => ({ default: () => <div>NewCasesTrendWidget</div> }));
vi.mock('./components/widgets/FlakyTestsWidget', () => ({ default: () => <div>FlakyTestsWidget</div> }));

vi.mock('./utils/exportUtils', () => ({
    exportToExcel: vi.fn(),
}));

// Mock data explicitly
vi.mock('./data/mockData', () => ({
    getOverviewMetrics: () => ({
        totalTestCases: 100,
        automationCount: 80,
        manualCount: 20,
        passRate: 95,
        totalBuilds: 10
    }),
    getExecutionTestCases: () => ([
        { id: 'TC-1', name: 'Test 1', module: 'Auth', type: 'Automation', status: 'Passed', duration: '1s', executedAt: '2023-01-01' }
    ]),
    getEnvironmentStats: () => [],
    getBuildStats: () => [],
    getFlakyTests: () => ({ percentage: 0, topFlaky: [] }),
    getNewTestCasesTrend: () => [],
    getAutomationVsManualData: () => [],
    getFailureDistribution: () => [],
    getExecutionHistory: () => [],
}));

describe('App Integration', () => {
    it('renders dashboard by default', () => {
        render(<App />);
        expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
        expect(screen.getByText('Total Test Cases')).toBeInTheDocument();
    });

    it('navigates to Test Cases page when Total Test Cases card is clicked', async () => {
        render(<App />);
        const cardTitle = screen.getByText('Total Test Cases');
        fireEvent.click(cardTitle.closest('.stat-card'));

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Test Cases Management/i })).toBeInTheDocument();
        });
        expect(screen.getByText('All Test Cases')).toBeInTheDocument();
    });

    it('navigates using Sidebar', async () => {
        render(<App />);

        // Find Analytics in Sidebar specifically
        const sidebar = document.querySelector('.sidebar');
        const analyticsNav = within(sidebar).getByText('Analytics');
        fireEvent.click(analyticsNav.closest('.nav-item'));

        await waitFor(() => {
            expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
        });

        const settingsNav = within(sidebar).getByText('Settings');
        fireEvent.click(settingsNav.closest('.nav-item'));

        await waitFor(() => {
            expect(screen.getByRole('heading', { level: 3, name: 'Settings' })).toBeInTheDocument();
        });
    });

    it('calls exportToExcel when Generate Report is clicked', async () => {
        render(<App />);
        const generateBtn = screen.getByRole('button', { name: /Generate Report/i });
        fireEvent.click(generateBtn);

        await waitFor(() => {
            expect(exportUtils.exportToExcel).toHaveBeenCalled();
        });
    });
});
