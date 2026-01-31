import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getBuildStats } from '../../data/mockData';

const BuildTrendWidget = () => {
    const data = useMemo(() => getBuildStats(), []);

    return (
        <div className="card chart-card">
            <div className="card-header-row">
                <h3 className="widget-title">Test Cases per Build</h3>
                <select className="widget-select">
                    <option>Last 10 Builds</option>
                    <option>Last 20 Builds</option>
                </select>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-pass)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--chart-pass)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorFail" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-fail)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--chart-fail)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="build"
                            stroke="var(--text-secondary)"
                            tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                            tickLine={false}
                            axisLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--glass-border)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="passed"
                            name="Passed"
                            stroke="var(--chart-pass)"
                            fillOpacity={1}
                            fill="url(#colorPass)"
                        />
                        <Area
                            type="monotone"
                            dataKey="failed"
                            name="Failed"
                            stroke="var(--chart-fail)"
                            fillOpacity={1}
                            fill="url(#colorFail)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <style>{`
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .widget-select {
          background: var(--bg-primary);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          outline: none;
        }
      `}</style>
        </div>
    );
};

export default BuildTrendWidget;
