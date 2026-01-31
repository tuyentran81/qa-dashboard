import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { getBuildStats, getFailureDistribution } from '../../data/mockData';
import { TrendingUp, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, trendUp }) => (
    <div className="stat-card">
        <div className="stat-header">
            <span className="stat-title">{title}</span>
            <span className="stat-icon">{icon}</span>
        </div>
        <div className="stat-value">{value}</div>
        <div className={`stat-trend ${trendUp ? 'positive' : 'negative'}`}>
            {trend}
        </div>
    </div>
);

const AnalyticsPage = () => {
    const buildData = getBuildStats();
    const failureData = getFailureDistribution();
    const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];

    return (
        <div className="page-container">
            <h3 className="section-title">Analytics Dashboard</h3>

            <div className="stats-grid">
                <StatCard
                    title="Avg Pass Rate"
                    value="94.2%"
                    icon={<CheckCircle size={20} color="var(--success)" />}
                    trend="+2.1% from last week"
                    trendUp={true}
                />
                <StatCard
                    title="Total Failures"
                    value="142"
                    icon={<AlertTriangle size={20} color="var(--danger)" />}
                    trend="-12% from last week"
                    trendUp={true} // Less failures is positive
                />
                <StatCard
                    title="Weekly Executions"
                    value="1,240"
                    icon={<Activity size={20} color="var(--chart-auto)" />}
                    trend="+5% activity"
                    trendUp={true}
                />
                <StatCard
                    title="Flaky Tests"
                    value="3.5%"
                    icon={<TrendingUp size={20} color="var(--warning)" />}
                    trend="+0.5% increase"
                    trendUp={false}
                />
            </div>

            <div className="charts-container">
                <div className="chart-card wide">
                    <h4>Execution Trend (Last 10 Builds)</h4>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={buildData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                                <XAxis dataKey="build" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="passed" stroke="var(--success)" activeDot={{ r: 8 }} strokeWidth={2} />
                                <Line type="monotone" dataKey="failed" stroke="var(--danger)" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card">
                    <h4>Failure Distribution by Module</h4>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={failureData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                                <XAxis type="number" stroke="var(--text-secondary)" />
                                <YAxis dataKey="name" type="category" width={100} stroke="var(--text-secondary)" />
                                <Tooltip
                                    cursor={{ fill: 'var(--bg-hover)' }}
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                />
                                <Bar dataKey="value" fill="var(--danger)" radius={[0, 4, 4, 0]}>
                                    {failureData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
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
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1rem;
                }
                .stat-card {
                    background: var(--bg-card);
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .stat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .stat-title {
                    color: var(--text-secondary);
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                .stat-trend {
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                .stat-trend.positive { color: var(--success); }
                .stat-trend.negative { color: var(--danger); }

                .charts-container {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                }
                @media (max-width: 1024px) {
                    .charts-container {
                        grid-template-columns: 1fr;
                    }
                }
                .chart-card {
                    background: var(--bg-card);
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    min-height: 400px;
                }
                .chart-card h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .chart-wrapper {
                    flex: 1;
                    width: 100%;
                    min-height: 0;
                }
            `}</style>
        </div>
    );
};

export default AnalyticsPage;
