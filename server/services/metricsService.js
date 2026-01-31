import { query } from '../db/connection.js';

/**
 * Get overview metrics for the dashboard
 */
export const getOverviewMetrics = async () => {
    try {
        // Get total test cases count
        const totalResult = await query('SELECT COUNT(*) as total FROM test_cases');
        const totalTestCases = parseInt(totalResult.rows[0].total);

        // Get automation count
        const autoResult = await query(
            "SELECT COUNT(*) as count FROM test_cases WHERE type = 'Automation'"
        );
        const automationCount = parseInt(autoResult.rows[0].count);

        // Get manual count
        const manualResult = await query(
            "SELECT COUNT(*) as count FROM test_cases WHERE type = 'Manual'"
        );
        const manualCount = parseInt(manualResult.rows[0].count);

        // Get pass rate from recent executions
        const passRateResult = await query(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'Passed') * 100.0 / COUNT(*) as pass_rate
      FROM test_executions
      WHERE executed_at > NOW() - INTERVAL '30 days'
    `);
        const passRate = parseFloat(passRateResult.rows[0].pass_rate || 0).toFixed(1);

        // Get total builds
        const buildsResult = await query('SELECT COUNT(*) as total FROM builds');
        const totalBuilds = parseInt(buildsResult.rows[0].total);

        return {
            totalTestCases,
            automationCount,
            manualCount,
            passRate: parseFloat(passRate),
            totalBuilds,
        };
    } catch (error) {
        console.error('Error fetching overview metrics:', error);
        throw error;
    }
};

/**
 * Get automation vs manual data for pie chart
 */
export const getAutomationVsManualData = async () => {
    try {
        const result = await query(`
      SELECT 
        type,
        COUNT(*) as value
      FROM test_cases
      GROUP BY type
    `);

        return result.rows.map(row => ({
            name: row.type,
            value: parseInt(row.value),
            color: row.type === 'Automation' ? 'var(--chart-auto)' : 'var(--chart-manual)',
        }));
    } catch (error) {
        console.error('Error fetching automation vs manual data:', error);
        throw error;
    }
};

/**
 * Get environment execution statistics
 */
export const getEnvironmentStats = async () => {
    try {
        const result = await query(`
      SELECT 
        e.name,
        COUNT(te.id) as tests,
        COUNT(te.id) FILTER (WHERE te.status = 'Passed') as pass,
        COUNT(te.id) FILTER (WHERE te.status = 'Failed') as fail
      FROM environments e
      LEFT JOIN test_executions te ON e.id = te.environment_id
      GROUP BY e.name
      ORDER BY e.id
    `);

        return result.rows.map(row => ({
            name: row.name,
            tests: parseInt(row.tests),
            pass: parseInt(row.pass),
            fail: parseInt(row.fail),
        }));
    } catch (error) {
        console.error('Error fetching environment stats:', error);
        throw error;
    }
};

/**
 * Get build statistics for trend chart
 */
export const getBuildStats = async () => {
    try {
        const result = await query(`
      SELECT 
        b.build_number as build,
        COUNT(te.id) as total,
        COUNT(te.id) FILTER (WHERE te.status = 'Passed') as passed,
        COUNT(te.id) FILTER (WHERE te.status = 'Failed') as failed
      FROM builds b
      LEFT JOIN test_executions te ON b.id = te.build_id
      WHERE b.build_number LIKE '#1%'
      GROUP BY b.id, b.build_number
      ORDER BY b.id DESC
      LIMIT 10
    `);

        return result.rows.map(row => ({
            build: row.build,
            total: parseInt(row.total),
            passed: parseInt(row.passed),
            failed: parseInt(row.failed),
        })).reverse();
    } catch (error) {
        console.error('Error fetching build stats:', error);
        throw error;
    }
};

/**
 * Get flaky tests data
 */
export const getFlakyTests = async () => {
    try {
        // Get flaky test percentage
        const percentageResult = await query(`
      SELECT 
        COUNT(DISTINCT ft.test_case_id) * 100.0 / 
        (SELECT COUNT(*) FROM test_cases WHERE type = 'Automation') as percentage
      FROM flaky_tests ft
    `);
        const percentage = parseFloat(percentageResult.rows[0].percentage || 0).toFixed(1);

        // Get top flaky tests
        const topFlakyResult = await query(`
      SELECT 
        tc.test_id as id,
        tc.name,
        ft.flakiness_count as flakiness
      FROM flaky_tests ft
      JOIN test_cases tc ON ft.test_case_id = tc.id
      ORDER BY ft.flakiness_count DESC
      LIMIT 3
    `);

        return {
            percentage: parseFloat(percentage),
            topFlaky: topFlakyResult.rows.map(row => ({
                id: row.id,
                name: row.name,
                flakiness: parseInt(row.flakiness),
            })),
        };
    } catch (error) {
        console.error('Error fetching flaky tests:', error);
        throw error;
    }
};

/**
 * Get new test cases trend based on filter
 */
export const getNewTestCasesTrend = async (filter = '30d') => {
    try {
        let days = 30;
        if (filter === '7d') days = 7;
        if (filter === 'quarter') days = 90;

        const result = await query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_cases
      FROM test_cases
      WHERE created_at > NOW() - INTERVAL '${days} days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

        // If no data, generate sample data
        if (result.rows.length === 0) {
            const data = [];
            const today = new Date();
            for (let i = days; i >= 0; i--) {
                const d = new Date();
                d.setDate(today.getDate() - i);
                const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                data.push({
                    date: dateStr,
                    newCases: Math.floor(Math.random() * 15) + (i % 7 === 0 ? 20 : 0),
                });
            }
            return data;
        }

        return result.rows.map(row => ({
            date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            newCases: parseInt(row.new_cases),
        }));
    } catch (error) {
        console.error('Error fetching new test cases trend:', error);
        throw error;
    }
};

/**
 * Get failure distribution by module
 */
export const getFailureDistribution = async () => {
    try {
        const result = await query(`
      SELECT 
        tc.module as name,
        COUNT(te.id) as value
      FROM test_executions te
      JOIN test_cases tc ON te.test_case_id = tc.id
      WHERE te.status = 'Failed'
      GROUP BY tc.module
      ORDER BY value DESC
    `);

        return result.rows.map(row => ({
            name: row.name,
            value: parseInt(row.value),
        }));
    } catch (error) {
        console.error('Error fetching failure distribution:', error);
        throw error;
    }
};
