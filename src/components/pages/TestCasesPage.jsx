import React, { useMemo, useState } from 'react';
import { getExecutionTestCases } from '../../data/mockData';
import { AlertCircle, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const TestCasesPage = () => {
  const testCases = useMemo(() => getExecutionTestCases(), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Calculate pagination
  const totalPages = Math.ceil(testCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTestCases = testCases.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Passed': return <CheckCircle size={16} color="var(--success)" />;
      case 'Failed': return <XCircle size={16} color="var(--danger)" />;
      case 'Flaky': return <AlertCircle size={16} color="var(--warning)" />;
      default: return <Clock size={16} color="var(--text-muted)" />;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="page-container">
      <h3 className="section-title">All Test Cases</h3>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Test Name</th>
              <th>Module</th>
              <th>Type</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Executed At</th>
            </tr>
          </thead>
          <tbody>
            {currentTestCases.map((tc) => (
              <tr key={tc.id}>
                <td className="font-mono">{tc.id}</td>
                <td>{tc.name}</td>
                <td><span className="badge">{tc.module}</span></td>
                <td>{tc.type}</td>
                <td>
                  <div className={`status-badge ${tc.status.toLowerCase()}`}>
                    {getStatusIcon(tc.status)}
                    <span>{tc.status}</span>
                  </div>
                </td>
                <td className="font-mono">{tc.duration}</td>
                <td>{tc.executedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <div className="items-per-page">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="page-select"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>

        <div className="page-navigation">
          <span>
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, testCases.length)} of {testCases.length}
          </span>
          <div className="nav-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="nav-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="nav-btn"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .page-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .table-container {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--glass-border);
        }

        .data-table th {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.875rem;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:hover {
          background: var(--bg-hover);
        }

        .font-mono {
          font-family: monospace;
        }

        .badge {
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          border: 1px solid var(--glass-border);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        
        .status-badge.passed { color: var(--success); }
        .status-badge.failed { color: var(--danger); }
        .status-badge.flaky { color: var(--warning); }

        .pagination-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--bg-card);
            border-top: 1px solid var(--glass-border);
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        .items-per-page {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .page-select {
            background: var(--bg-secondary);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
        }

        .page-navigation {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .nav-buttons {
            display: flex;
            gap: 0.25rem;
        }

        .nav-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            padding: 0.25rem;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .nav-btn:not(:disabled):hover {
            background: var(--bg-hover);
        }
      `}</style>
    </div>
  );
};

export default TestCasesPage;
