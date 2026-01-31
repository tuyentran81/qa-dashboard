import * as metricsService from '../services/metricsService.js';

/**
 * Get overview metrics
 */
export const getOverview = async (req, res) => {
    try {
        const metrics = await metricsService.getOverviewMetrics();
        res.json(metrics);
    } catch (error) {
        console.error('Error in getOverview:', error);
        res.status(500).json({ error: 'Failed to fetch overview metrics' });
    }
};

/**
 * Get automation vs manual data
 */
export const getAutomationVsManual = async (req, res) => {
    try {
        const data = await metricsService.getAutomationVsManualData();
        res.json(data);
    } catch (error) {
        console.error('Error in getAutomationVsManual:', error);
        res.status(500).json({ error: 'Failed to fetch automation vs manual data' });
    }
};

/**
 * Get environment stats
 */
export const getEnvironmentStats = async (req, res) => {
    try {
        const stats = await metricsService.getEnvironmentStats();
        res.json(stats);
    } catch (error) {
        console.error('Error in getEnvironmentStats:', error);
        res.status(500).json({ error: 'Failed to fetch environment stats' });
    }
};

/**
 * Get build stats
 */
export const getBuildStats = async (req, res) => {
    try {
        const stats = await metricsService.getBuildStats();
        res.json(stats);
    } catch (error) {
        console.error('Error in getBuildStats:', error);
        res.status(500).json({ error: 'Failed to fetch build stats' });
    }
};

/**
 * Get flaky tests
 */
export const getFlakyTests = async (req, res) => {
    try {
        const data = await metricsService.getFlakyTests();
        res.json(data);
    } catch (error) {
        console.error('Error in getFlakyTests:', error);
        res.status(500).json({ error: 'Failed to fetch flaky tests' });
    }
};

/**
 * Get new test cases trend
 */
export const getNewTestCasesTrend = async (req, res) => {
    try {
        const filter = req.query.filter || '30d';
        const data = await metricsService.getNewTestCasesTrend(filter);
        res.json(data);
    } catch (error) {
        console.error('Error in getNewTestCasesTrend:', error);
        res.status(500).json({ error: 'Failed to fetch new test cases trend' });
    }
};

/**
 * Get failure distribution
 */
export const getFailureDistribution = async (req, res) => {
    try {
        const data = await metricsService.getFailureDistribution();
        res.json(data);
    } catch (error) {
        console.error('Error in getFailureDistribution:', error);
        res.status(500).json({ error: 'Failed to fetch failure distribution' });
    }
};
