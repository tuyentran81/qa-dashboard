import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatCard Component
 * @param {string} title - The title of the metric
 * @param {string|number} value - The main value to display
 * @param {string} subtext - Supporting text
 * @param {React.ReactNode} icon - Icon component
 * @param {object} trend - { value: number, isPositive: boolean }
 */
const StatCard = ({ title, value, subtext, icon, trend, onClick }) => {
  return (
    <div
      className={`card stat-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="card-header">
        <span className="card-title">{title}</span>
        <div className="card-icon">{icon}</div>
      </div>

      <div className="card-content">
        <div className="value-container">
          <span className="card-value">{value}</span>
          {trend && (
            <div className={`trend-badge ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
              {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {subtext && <p className="card-subtext">{subtext}</p>}
      </div>

      <style>{`
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card.clickable {
            cursor: pointer;
        }

        .stat-card.clickable:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .card-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .card-icon {
          color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .card-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .value-container {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .trend-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
        }

        .trend-up {
          color: var(--success);
          background: rgba(16, 185, 129, 0.1);
        }

        .trend-down {
          color: var(--danger);
          background: rgba(239, 68, 68, 0.1);
        }

        .card-subtext {
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default StatCard;
