import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getAutomationVsManualData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, total }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                <p className="label" style={{ fontWeight: 600 }}>{`${payload[0].name}`}</p>
                <p className="intro" style={{ color: payload[0].fill }}>
                    {`${payload[0].value} Cases (${((payload[0].value / total) * 100).toFixed(1)}%)`}
                </p>
            </div>
        );
    }
    return null;
};

const PieChartWidget = () => {
    const data = useMemo(() => getAutomationVsManualData(), []);

    // Calculate percentages
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="card chart-card">
            <h3 className="widget-title">Automation Coverage</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip total={total} />} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text Overlay */}
                <div className="donut-center-text">
                    <span className="total-value">{total}</span>
                    <span className="total-label">Total</span>
                </div>
            </div>

            <style>{`
        .chart-card {
          height: 100%;
          min-height: 300px;
          display: flex;
          flex-direction: column;
        }
        
        .widget-title {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .chart-container {
          flex: 1;
          position: relative;
          min-height: 200px;
        }

        .donut-center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%); /* Adjust for legend height */
          text-align: center;
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }

        .total-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .total-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default PieChartWidget;
