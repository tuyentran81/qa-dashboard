import React from 'react';
import { LayoutDashboard, FileText, PieChart, Settings, Activity, ShieldCheck } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'test-cases', label: 'Test Cases', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart size={20} /> },
    { id: 'executions', label: 'Executions', icon: <Activity size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <ShieldCheck size={32} color="var(--primary)" />
        <span className="logo-text">QA Master</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">QA</div>
          <div className="user-info">
            <span className="user-name">QA Lead</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--bg-secondary);
          border-right: 1px solid var(--glass-border);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          z-index: 50;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding: 0 0.5rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
          color: var(--primary);
          border-left: 3px solid var(--primary);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--bg-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--primary);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
