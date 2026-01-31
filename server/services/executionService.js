import { query } from '../db/connection.js';

/**
 * Get execution test cases with pagination and filtering
 */
export const getExecutionTestCases = async (page = 1, limit = 250, filters = {}) => {
    try {
        const offset = (page - 1) * limit;

        let whereClause = '';
        const params = [];
        let paramCount = 1;

        if (filters.status) {
            params.push(filters.status);
            whereClause += ` AND te.status = $${paramCount++}`;
        }

        if (filters.type) {
            params.push(filters.type);
            whereClause += ` AND tc.type = $${paramCount++}`;
        }

        if (filters.module) {
            params.push(filters.module);
            whereClause += ` AND tc.module = $${paramCount++}`;
        }

        params.push(limit, offset);

        const result = await query(`
      SELECT 
        tc.test_id as id,
        tc.name,
        tc.module,
        tc.type,
        te.status,
        te.duration,
        DATE(te.executed_at) as executed_at
      FROM test_cases tc
      LEFT JOIN test_executions te ON tc.id = te.test_case_id
      WHERE 1=1 ${whereClause}
      ORDER BY te.executed_at DESC NULLS LAST
      LIMIT $${paramCount++} OFFSET $${paramCount}
    `, params);

        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            module: row.module,
            type: row.type,
            status: row.status || 'Not Executed',
            duration: row.duration || '-',
            executedAt: row.executed_at ? row.executed_at.toISOString().split('T')[0] : '-',
        }));
    } catch (error) {
        console.error('Error fetching execution test cases:', error);
        throw error;
    }
};

/**
 * Get execution history
 */
export const getExecutionHistory = async () => {
    try {
        const result = await query(`
      SELECT 
        b.id,
        b.build_number as build,
        b.branch,
        e.name as env,
        b.status,
        b.duration,
        b.triggered_by
      FROM builds b
      LEFT JOIN test_executions te ON b.id = te.build_id
      LEFT JOIN environments e ON te.environment_id = e.id
      WHERE b.build_number LIKE '#105%'
      GROUP BY b.id, b.build_number, b.branch, e.name, b.status, b.duration, b.triggered_by
      ORDER BY b.id DESC
      LIMIT 5
    `);

        return result.rows.map(row => ({
            id: row.id,
            build: row.build,
            branch: row.branch,
            env: row.env || 'N/A',
            status: row.status,
            duration: row.duration,
            triggeredBy: row.triggered_by,
        }));
    } catch (error) {
        console.error('Error fetching execution history:', error);
        throw error;
    }
};
