/**
 * Mock Data Service
 * Simulates API calls to fetch dashboard metrics.
 */

// Total Test Cases Overview
export const getOverviewMetrics = () => {
  return {
    totalTestCases: 2450,
    automationCount: 1850,
    manualCount: 600,
    passRate: 98.2,
    totalBuilds: 142
  };
};

// Automation vs Manual (Pie Chart)
export const getAutomationVsManualData = () => {
  return [
    { name: 'Automation', value: 1850, color: 'var(--chart-auto)' },
    { name: 'Manual', value: 600, color: 'var(--chart-manual)' },
  ];
};

// Environment Execution Stats (Bar Chart)
export const getEnvironmentStats = () => {
  return [
    { name: 'Dev', tests: 1850, pass: 1800, fail: 50 },
    { name: 'Staging', tests: 1850, pass: 1840, fail: 10 },
    { name: 'Production', tests: 450, pass: 450, fail: 0 }, // Smoke tests usually
  ];
};

// Test Cases per Build (Area/Line Chart)
export const getBuildStats = () => {
  // Generate last 10 builds
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      build: `Build #${100 + i}`,
      total: 1500 + (i * 30), // Increasing trend
      passed: 1450 + (i * 28),
      failed: 50 + (i * 2)
    });
  }
  return data;
};

// Flaky Tests (List or Gauge)
export const getFlakyTests = () => {
  return {
    percentage: 3.5,
    topFlaky: [
      { id: 'TC-101', name: 'Checkout Payment Flow', flakiness: 12 },
      { id: 'TC-204', name: 'User Registration via Email', flakiness: 8 },
      { id: 'TC-405', name: 'Add to Cart Animation', flakiness: 5 },
    ]
  };
};

// New Test Cases Trend (Line Chart)
// Filter: '7d', '30d', 'quarter', 'custom'
export const getNewTestCasesTrend = (filter = '30d') => {
  const data = [];
  let days = 30;
  if (filter === '7d') days = 7;
  if (filter === 'quarter') days = 90;

  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    // Simulate some random additions
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    data.push({
      date: dateStr,
      newCases: Math.floor(Math.random() * 15) + (i % 7 === 0 ? 20 : 0) // Spikes weekly
    });
  }
  return data;
};

// Execution Test Cases List
export const getExecutionTestCases = () => {
  const statuses = ['Passed', 'Failed', 'Skipped', 'Flaky'];
  const types = ['Automation', 'Manual'];
  const modules = ['Authentication', 'Checkout', 'Profile', 'Search', 'Payment'];

  const data = [];
  for (let i = 1; i <= 250; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    data.push({
      id: `TC-${1000 + i}`,
      name: `${modules[i % modules.length]} - Test Functionality ${i}`,
      module: modules[i % modules.length],
      type: type,
      status: status,
      duration: type === 'Automation' ? `${(Math.random() * 5).toFixed(2)}s` : '-',
      executedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0]
    });
  }
  return data;
};

export const getExecutionHistory = () => {
  return [
    { id: 1, build: '#1056', branch: 'main', env: 'Production', status: 'Passed', duration: '15m 30s', triggeredBy: 'Schedule' },
    { id: 2, build: '#1055', branch: 'feature/login', env: 'Staging', status: 'Failed', duration: '12m 45s', triggeredBy: 'John Doe' },
    { id: 3, build: '#1054', branch: 'fix/auth-bug', env: 'Dev', status: 'Passed', duration: '10m 12s', triggeredBy: 'Jane Smith' },
    { id: 4, build: '#1053', branch: 'main', env: 'Production', status: 'Passed', duration: '14m 20s', triggeredBy: 'Schedule' },
    { id: 5, build: '#1052', branch: 'feature/dashboard', env: 'Staging', status: 'Skipped', duration: '0m 0s', triggeredBy: 'CI/CD' },
  ];
};

export const getFailureDistribution = () => {
  return [
    { name: 'Authentication', value: 15 },
    { name: 'Checkout', value: 10 },
    { name: 'Search', value: 8 },
    { name: 'Profile', value: 5 },
    { name: 'Payment', value: 12 },
  ];
};
