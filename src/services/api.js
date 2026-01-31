/**
 * API Service
 * Handles all API calls to the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
const fetchAPI = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Get overview metrics
 */
export const getOverviewMetrics = async () => {
    return await fetchAPI('/overview');
};

/**
 * Get automation vs manual data for pie chart
 */
export const getAutomationVsManualData = async () => {
    return await fetchAPI('/automation-vs-manual');
};

/**
 * Get environment execution statistics
 */
export const getEnvironmentStats = async () => {
    return await fetchAPI('/environment-stats');
};

/**
 * Get build statistics for trend chart
 */
export const getBuildStats = async () => {
    return await fetchAPI('/build-stats');
};

/**
 * Get flaky tests data
 */
export const getFlakyTests = async () => {
    return await fetchAPI('/flaky-tests');
};

/**
 * Get new test cases trend
 * @param {string} filter - Filter period: '7d', '30d', 'quarter', or 'custom'
 */
export const getNewTestCasesTrend = async (filter = '30d') => {
    return await fetchAPI(`/new-test-cases-trend?filter=${filter}`);
};

/**
 * Get execution test cases list
 */
export const getExecutionTestCases = async () => {
    return await fetchAPI('/test-cases');
};

/**
 * Get execution history
 */
export const getExecutionHistory = async () => {
    return await fetchAPI('/execution-history');
};

/**
 * Get failure distribution by module
 */
export const getFailureDistribution = async () => {
    return await fetchAPI('/failure-distribution');
};
