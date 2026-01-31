-- QA Dashboard Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS test_executions CASCADE;
DROP TABLE IF EXISTS flaky_tests CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS builds CASCADE;
DROP TABLE IF EXISTS environments CASCADE;

-- Environments table
CREATE TABLE environments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Builds table
CREATE TABLE builds (
    id SERIAL PRIMARY KEY,
    build_number VARCHAR(50) NOT NULL UNIQUE,
    branch VARCHAR(100),
    triggered_by VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('Passed', 'Failed', 'Skipped')),
    duration VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases table
CREATE TABLE test_cases (
    id SERIAL PRIMARY KEY,
    test_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    module VARCHAR(100),
    type VARCHAR(20) CHECK (type IN ('Automation', 'Manual')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Executions table
CREATE TABLE test_executions (
    id SERIAL PRIMARY KEY,
    test_case_id INTEGER REFERENCES test_cases(id) ON DELETE CASCADE,
    build_id INTEGER REFERENCES builds(id) ON DELETE CASCADE,
    environment_id INTEGER REFERENCES environments(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('Passed', 'Failed', 'Skipped', 'Flaky')),
    duration VARCHAR(20),
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flaky Tests table
CREATE TABLE flaky_tests (
    id SERIAL PRIMARY KEY,
    test_case_id INTEGER REFERENCES test_cases(id) ON DELETE CASCADE,
    flakiness_count INTEGER DEFAULT 0,
    last_flaky_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(test_case_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_test_cases_type ON test_cases(type);
CREATE INDEX idx_test_cases_module ON test_cases(module);
CREATE INDEX idx_test_executions_status ON test_executions(status);
CREATE INDEX idx_test_executions_executed_at ON test_executions(executed_at);
CREATE INDEX idx_builds_created_at ON builds(created_at);
