import React, { useState } from 'react';
import { getExecutionHistory } from '../../data/mockData';
import { Play, CheckCircle, XCircle, AlertCircle, Clock, RotateCcw } from 'lucide-react';

const ExecutionPage = () => {
    const [executions, setExecutions] = useState(() => getExecutionHistory());
    const [isRunning, setIsRunning] = useState(false);

    const handleTriggerRun = () => {
        setIsRunning(true);
        // Simulate a new run
        const newRun = {
            id: executions.length + 1,
            build: `#${1057 + executions.length}`,
            branch: 'feature/new-update',
            env: 'Dev',
            status: 'Running',
            duration: '-',
            triggeredBy: 'You'
        };
        setExecutions([newRun, ...executions]);

        // Simulate completion after 3 seconds
        setTimeout(() => {
            setExecutions(prev => prev.map(ex =>
                ex.id === newRun.id
                    ? { ...ex, status: 'Passed', duration: '2m 14s' }
                    : ex
            ));
            setIsRunning(false);
        }, 3000);
    };

    const getStatusBadge = (status) => {
        let icon;
        let colorClass;

        switch (status) {
            case 'Passed':
                icon = <CheckCircle size={16} />;
                colorClass = 'passed';
                break;
            case 'Failed':
                icon = <XCircle size={16} />;
                colorClass = 'failed';
                break;
            case 'Running':
                icon = <RotateCcw size={16} className="spin" />;
                colorClass = 'running';
                break;
            default:
                icon = <Clock size={16} />;
                colorClass = 'skipped';
        }

        return (
            <div className={`status-badge ${colorClass}`}>
                {icon}
                <span>{status}</span>
            </div>
        );
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h3 className="section-title">Execution History</h3>
                <button
                    className="trigger-btn"
                    onClick={handleTriggerRun}
                    disabled={isRunning}
                >
                    <Play size={16} />
                    {isRunning ? 'Running...' : 'Trigger New Run'}
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Build #</th>
                            <th>Branch</th>
                            <th>Environment</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Triggered By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {executions.map((exec) => (
                            <tr key={exec.id}>
                                <td className="font-mono">{exec.build}</td>
                                <td className="branch-cell">{exec.branch}</td>
                                <td><span className="badge">{exec.env}</span></td>
                                <td>{getStatusBadge(exec.status)}</td>
                                <td>{exec.duration}</td>
                                <td>{exec.triggeredBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .page-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                .trigger-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                }
                .trigger-btn:hover:not(:disabled) {
                    background: var(--primary-hover);
                    transform: translateY(-1px);
                }
                .trigger-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .table-container {
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
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
                .data-table tr:hover {
                    background: var(--bg-hover);
                }
                .font-mono { font-family: monospace; }
                .branch-cell { font-family: monospace; color: var(--text-primary); }
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
                    padding: 0.25rem 0.5rem;
                    border-radius: 999px;
                    width: fit-content;
                }
                .status-badge.passed { background: rgba(16, 185, 129, 0.1); color: var(--success); }
                .status-badge.failed { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
                .status-badge.skipped { background: rgba(107, 114, 128, 0.1); color: var(--text-muted); }
                .status-badge.running { background: rgba(59, 130, 246, 0.1); color: var(--primary); }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin {
                    animation: spin 2s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ExecutionPage;
