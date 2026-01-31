import express from 'express';
import * as metricsController from '../controllers/metricsController.js';
import * as executionController from '../controllers/executionController.js';

const router = express.Router();

// Metrics endpoints
router.get('/overview', metricsController.getOverview);
router.get('/automation-vs-manual', metricsController.getAutomationVsManual);
router.get('/environment-stats', metricsController.getEnvironmentStats);
router.get('/build-stats', metricsController.getBuildStats);
router.get('/flaky-tests', metricsController.getFlakyTests);
router.get('/new-test-cases-trend', metricsController.getNewTestCasesTrend);
router.get('/failure-distribution', metricsController.getFailureDistribution);

// Execution endpoints
router.get('/test-cases', executionController.getExecutionTestCases);
router.get('/execution-history', executionController.getExecutionHistory);

export default router;
