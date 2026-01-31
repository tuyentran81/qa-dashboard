-- Seed data for QA Dashboard
-- This data matches the mock data structure from the frontend

-- Insert Environments
INSERT INTO environments (name) VALUES 
    ('Dev'),
    ('Staging'),
    ('Production');

-- Insert Builds (last 10 builds)
INSERT INTO builds (build_number, branch, triggered_by, status, duration) VALUES
    ('#101', 'main', 'Schedule', 'Passed', '15m 30s'),
    ('#102', 'feature/login', 'Schedule', 'Passed', '14m 45s'),
    ('#103', 'fix/auth-bug', 'Schedule', 'Passed', '13m 20s'),
    ('#104', 'main', 'Schedule', 'Passed', '15m 10s'),
    ('#105', 'feature/dashboard', 'Schedule', 'Passed', '16m 05s'),
    ('#106', 'main', 'Schedule', 'Passed', '15m 50s'),
    ('#107', 'feature/analytics', 'Schedule', 'Passed', '17m 30s'),
    ('#108', 'main', 'Schedule', 'Passed', '16m 20s'),
    ('#109', 'feature/export', 'Schedule', 'Passed', '18m 15s'),
    ('#110', 'main', 'Schedule', 'Passed', '17m 40s'),
    ('#1053', 'main', 'Schedule', 'Passed', '14m 20s'),
    ('#1054', 'fix/auth-bug', 'Jane Smith', 'Passed', '10m 12s'),
    ('#1055', 'feature/login', 'John Doe', 'Failed', '12m 45s'),
    ('#1056', 'main', 'Schedule', 'Passed', '15m 30s'),
    ('#1052', 'feature/dashboard', 'CI/CD', 'Skipped', '0m 0s');

-- Insert Test Cases (250 test cases - automation and manual)
DO $$
DECLARE
    i INTEGER;
    test_type VARCHAR(20);
    module_name VARCHAR(100);
    modules TEXT[] := ARRAY['Authentication', 'Checkout', 'Profile', 'Search', 'Payment'];
BEGIN
    FOR i IN 1..250 LOOP
        -- Determine type (75% automation, 25% manual to match ~1850/600 ratio)
        IF i % 4 = 0 THEN
            test_type := 'Manual';
        ELSE
            test_type := 'Automation';
        END IF;
        
        module_name := modules[(i % 5) + 1];
        
        INSERT INTO test_cases (test_id, name, module, type)
        VALUES (
            'TC-' || (1000 + i),
            module_name || ' - Test Functionality ' || i,
            module_name,
            test_type
        );
    END LOOP;
END $$;

-- Add more automation test cases to reach ~1850 automation tests
DO $$
DECLARE
    i INTEGER;
    module_name VARCHAR(100);
    modules TEXT[] := ARRAY['Authentication', 'Checkout', 'Profile', 'Search', 'Payment'];
BEGIN
    FOR i IN 251..1850 LOOP
        module_name := modules[(i % 5) + 1];
        
        INSERT INTO test_cases (test_id, name, module, type)
        VALUES (
            'TC-' || (1000 + i),
            module_name || ' - Automated Test ' || i,
            module_name,
            'Automation'
        );
    END LOOP;
END $$;

-- Add manual test cases to reach ~600 manual tests
DO $$
DECLARE
    i INTEGER;
    module_name VARCHAR(100);
    modules TEXT[] := ARRAY['Authentication', 'Checkout', 'Profile', 'Search', 'Payment'];
BEGIN
    FOR i IN 1851..2450 LOOP
        module_name := modules[(i % 5) + 1];
        
        INSERT INTO test_cases (test_id, name, module, type)
        VALUES (
            'TC-' || (1000 + i),
            module_name || ' - Manual Test ' || i,
            module_name,
            'Manual'
        );
    END LOOP;
END $$;

-- Insert Test Executions for the first 250 test cases
DO $$
DECLARE
    tc_id INTEGER;
    build_id INTEGER;
    env_id INTEGER;
    statuses TEXT[] := ARRAY['Passed', 'Failed', 'Skipped', 'Flaky'];
    exec_status VARCHAR(20);
    exec_duration VARCHAR(20);
    tc_type VARCHAR(20);
BEGIN
    FOR tc_id IN 1..250 LOOP
        -- Get test case type
        SELECT type INTO tc_type FROM test_cases WHERE id = tc_id;
        
        -- Random build (1-10)
        build_id := (tc_id % 10) + 1;
        
        -- Random environment (1-3)
        env_id := (tc_id % 3) + 1;
        
        -- Random status (weighted towards Passed)
        IF tc_id % 20 = 0 THEN
            exec_status := 'Failed';
        ELSIF tc_id % 50 = 0 THEN
            exec_status := 'Flaky';
        ELSIF tc_id % 100 = 0 THEN
            exec_status := 'Skipped';
        ELSE
            exec_status := 'Passed';
        END IF;
        
        -- Duration only for automation tests
        IF tc_type = 'Automation' THEN
            exec_duration := (RANDOM() * 5)::NUMERIC(10,2)::TEXT || 's';
        ELSE
            exec_duration := '-';
        END IF;
        
        INSERT INTO test_executions (test_case_id, build_id, environment_id, status, duration, executed_at)
        VALUES (
            tc_id,
            build_id,
            env_id,
            exec_status,
            exec_duration,
            CURRENT_TIMESTAMP - (RANDOM() * INTERVAL '30 days')
        );
    END LOOP;
END $$;

-- Insert Flaky Tests
INSERT INTO flaky_tests (test_case_id, flakiness_count)
SELECT id, 12 FROM test_cases WHERE test_id = 'TC-1101' -- Checkout Payment Flow
UNION ALL
SELECT id, 8 FROM test_cases WHERE test_id = 'TC-1204' -- User Registration
UNION ALL
SELECT id, 5 FROM test_cases WHERE test_id = 'TC-1405'; -- Add to Cart
