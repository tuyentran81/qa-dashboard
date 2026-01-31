import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getEnvironmentStats } from '../../data/mockData';

const BarChartWidget = () => {
    const data = useMemo(() => getEnvironmentStats(), []);

    return (
        <div className="card chart-card">
            <h3 className="widget-title">Execution by Environment</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        barSize={40}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                        <XAxis
                            dataKey="name"
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
                            cursor={{ fill: 'var(--bg-hover)' }}
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--glass-border)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="pass" name="Passed" stackId="a" fill="var(--chart-pass)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="fail" name="Failed" stackId="a" fill="var(--chart-fail)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <style>{`
        /* Reuse generic chart card styles or define specific if needed */
        .chart-card {
           min-height: 350px;
        }
      `}</style>
        </div>
    );
};

export default BarChartWidget;
