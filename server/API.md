# QA Dashboard API Documentation

Base URL: `http://localhost:5000/api`

## Health Check

### GET /health
Check server and database connection status.

**Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## Dashboard Metrics

### GET /api/overview
Get overview metrics for the dashboard.

**Response:**
```json
{
  "totalTestCases": 2450,
  "automationCount": 1850,
  "manualCount": 600,
  "passRate": 98.2,
  "totalBuilds": 142
}
```

### GET /api/automation-vs-manual
Get automation vs manual test case distribution for pie chart.

**Response:**
```json
[
  {
    "name": "Automation",
    "value": 1850,
    "color": "var(--chart-auto)"
  },
  {
    "name": "Manual",
    "value": 600,
    "color": "var(--chart-manual)"
  }
]
```

### GET /api/environment-stats
Get test execution statistics by environment.

**Response:**
```json
[
  {
    "name": "Dev",
    "tests": 1850,
    "pass": 1800,
    "fail": 50
  },
  {
    "name": "Staging",
    "tests": 1850,
    "pass": 1840,
    "fail": 10
  },
  {
    "name": "Production",
    "tests": 450,
    "pass": 450,
    "fail": 0
  }
]
```

### GET /api/build-stats
Get build statistics for trend visualization.

**Response:**
```json
[
  {
    "build": "#101",
    "total": 1530,
    "passed": 1478,
    "failed": 52
  },
  ...
]
```

### GET /api/flaky-tests
Get flaky test data and top flaky tests.

**Response:**
```json
{
  "percentage": 3.5,
  "topFlaky": [
    {
      "id": "TC-101",
      "name": "Checkout Payment Flow",
      "flakiness": 12
    },
    ...
  ]
}
```

### GET /api/new-test-cases-trend
Get new test cases trend data.

**Query Parameters:**
- `filter` (optional): Time period - `7d`, `30d`, `quarter`. Default: `30d`

**Example:** `/api/new-test-cases-trend?filter=7d`

**Response:**
```json
[
  {
    "date": "Jan 1",
    "newCases": 15
  },
  ...
]
```

### GET /api/failure-distribution
Get failure distribution by module.

**Response:**
```json
[
  {
    "name": "Authentication",
    "value": 15
  },
  {
    "name": "Checkout",
    "value": 10
  },
  ...
]
```

---

## Test Execution

### GET /api/test-cases
Get list of test cases with execution data.

**Query Parameters:**
- `page` (optional): Page number. Default: `1`
- `limit` (optional): Items per page. Default: `250`
- `status` (optional): Filter by status - `Passed`, `Failed`, `Skipped`, `Flaky`
- `type` (optional): Filter by type - `Automation`, `Manual`
- `module` (optional): Filter by module name

**Example:** `/api/test-cases?page=1&limit=50&status=Failed&type=Automation`

**Response:**
```json
[
  {
    "id": "TC-1001",
    "name": "Authentication - Test Functionality 1",
    "module": "Authentication",
    "type": "Automation",
    "status": "Passed",
    "duration": "2.5s",
    "executedAt": "2024-01-15"
  },
  ...
]
```

### GET /api/execution-history
Get recent execution history.

**Response:**
```json
[
  {
    "id": 1,
    "build": "#1056",
    "branch": "main",
    "env": "Production",
    "status": "Passed",
    "duration": "15m 30s",
    "triggeredBy": "Schedule"
  },
  ...
]
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "error": "Invalid parameter value"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to fetch data"
}
```

---

## CORS

The API supports CORS and can be accessed from the frontend running on `http://localhost:5173`.

## Rate Limiting

Currently, there is no rate limiting implemented. This may be added in future versions.
