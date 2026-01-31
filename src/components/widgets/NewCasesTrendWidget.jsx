import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getNewTestCasesTrend } from '../../data/mockData';

const NewCasesTrendWidget = () => {
    const [range, setRange] = useState('30d');

    // In a real app, this would trigger a fetch. Here we just re-call mock.
    const data = useMemo(() => getNewTestCasesTrend(range), [range]);

    return (
        <div className="card chart-card">
            <div className="card-header-row">
                <h3 className="widget-title">New Test Cases Trend</h3>
                <div className="filter-group">
                    {['7d', '30d', 'quarter'].map((filter) => (
                        <button
                            key={filter}
                            className={`filter-btn ${range === filter ? 'active' : ''}`}
                            onClick={() => setRange(filter)}
                        >
                            {filter === 'quarter' ? 'Quarter' : filter.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                        <XAxis
                            dataKey="date"
                            stroke="var(--text-secondary)"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--glass-border)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="newCases"
                            name="New Cases"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--primary)', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <style>{`
        .filter-group {
          display: flex;
          background: var(--bg-primary);
          padding: 2px;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: var(--bg-hover);
          color: var(--text-primary);
          font-weight: 600;
        }
      `}</style>
        </div>
    );
};

export default NewCasesTrendWidget;
