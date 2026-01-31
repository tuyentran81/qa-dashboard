import * as executionService from '../services/executionService.js';

/**
 * Get execution test cases
 */
export const getExecutionTestCases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 250;
        const filters = {
            status: req.query.status,
            type: req.query.type,
            module: req.query.module,
        };

        const testCases = await executionService.getExecutionTestCases(page, limit, filters);
        res.json(testCases);
    } catch (error) {
        console.error('Error in getExecutionTestCases:', error);
        res.status(500).json({ error: 'Failed to fetch execution test cases' });
    }
};

/**
 * Get execution history
 */
export const getExecutionHistory = async (req, res) => {
    try {
        const history = await executionService.getExecutionHistory();
        res.json(history);
    } catch (error) {
        console.error('Error in getExecutionHistory:', error);
        res.status(500).json({ error: 'Failed to fetch execution history' });
    }
};
