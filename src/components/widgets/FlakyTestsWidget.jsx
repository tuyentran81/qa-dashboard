import React, { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { getFlakyTests } from '../../data/mockData';

const FlakyTestsWidget = () => {
    const data = useMemo(() => getFlakyTests(), []);

    return (
        <div className="card flaky-card">
            <h3 className="widget-title">Flaky Tests Analysis</h3>

            <div className="flaky-summary">
                <div className="flaky-percentage-container">
                    <svg viewBox="0 0 36 36" className="circular-chart orange">
                        <path className="circle-bg"
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={`${data.percentage}, 100`}
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{data.percentage}%</text>
                    </svg>
                    <span className="flaky-label">Avg Flakiness</span>
                </div>

                <div className="top-flaky-list">
                    <h4 className="list-title">Top Flaky Tests</h4>
                    {data.topFlaky.map((test) => (
                        <div key={test.id} className="flaky-item">
                            <div className="flaky-item-info">
                                <span className="test-id">{test.id}</span>
                                <span className="test-name">{test.name}</span>
                            </div>
                            <div className="flaky-score">
                                <AlertCircle size={14} />
                                <span>{test.flakiness}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .flaky-card {
          display: flex;
          flex-direction: column;
        }

        .flaky-summary {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }

        .flaky-percentage-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 120px;
        }

        .circular-chart {
          display: block;
          margin: 0 auto;
          max-width: 80%;
          max-height: 250px;
        }

        .circle-bg {
          fill: none;
          stroke: var(--bg-hover);
          stroke-width: 3.8;
        }

        .circle {
          fill: none;
          stroke-width: 3.8;
          stroke-linecap: round;
          animation: progress 1s ease-out forwards;
          stroke: var(--warning);
        }

        .percentage {
          fill: var(--text-primary);
          font-family: sans-serif;
          font-weight: bold;
          font-size: 0.5em;
          text-anchor: middle;
        }

        .flaky-label {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .top-flaky-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .list-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .flaky-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .flaky-item-info {
          display: flex;
          flex-direction: column;
        }

        .test-id {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-family: monospace;
        }

        .test-name {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .flaky-score {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--warning);
          font-size: 0.8rem;
          font-weight: 600;
          background: rgba(245, 158, 11, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
        }
      `}</style>
        </div>
    );
};

export default FlakyTestsWidget;
