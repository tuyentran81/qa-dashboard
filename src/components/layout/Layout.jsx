import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, currentView, onNavigate, onGenerateReport }) => {
  return (
    <div className="layout-container">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <main className="main-content">
        <header className="top-header">
          <div className="header-content">
            <h2 className="page-title">
              {currentView === 'dashboard' && 'Dashboard Overview'}
              {currentView === 'test-cases' && 'Test Cases Management'}
              {currentView === 'analytics' && 'Analytics'}
              {currentView === 'executions' && 'Execution History'}
              {currentView === 'settings' && 'Settings'}
            </h2>
            <div className="header-actions">
              <button className="btn-secondary">Last 30 Days</button>
              <button className="btn-primary" onClick={onGenerateReport}>Generate Report</button>
            </div>
          </div>
        </header>

        <div className="content-scrollable">
          {children}
        </div>
      </main>

      <style>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        .main-content {
          margin-left: var(--sidebar-width);
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .top-header {
          height: var(--header-height);
          border-bottom: 1px solid var(--glass-border);
          background-color: var(--bg-primary); /* or glass-bg */
          display: flex;
          align-items: center;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .header-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-title {
          font-size: 1.25rem;
          text-transform: capitalize;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background-color: var(--primary-hover);
        }

        .btn-secondary {
          background-color: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }

        .content-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;
