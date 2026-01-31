import React, { useState, useMemo } from 'react';
import Layout from './components/layout/Layout';
import StatCard from './components/widgets/StatCard';
import PieChartWidget from './components/widgets/PieChartWidget';
import BarChartWidget from './components/widgets/BarChartWidget';
import BuildTrendWidget from './components/widgets/BuildTrendWidget';
import NewCasesTrendWidget from './components/widgets/NewCasesTrendWidget';
import FlakyTestsWidget from './components/widgets/FlakyTestsWidget';
import TestCasesPage from './components/pages/TestCasesPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import ExecutionPage from './components/pages/ExecutionPage';
import SettingsPage from './components/pages/SettingsPage';
import { getOverviewMetrics, getExecutionTestCases } from './data/mockData';
import { exportToExcel } from './utils/exportUtils';
import { FileText, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const metrics = useMemo(() => getOverviewMetrics(), []);

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
  };

  const handleGenerateReport = () => {
    const data = getExecutionTestCases();
    exportToExcel(data, `Execution_Report_${new Date().toISOString().split('T')[0]}`);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'test-cases':
        return <TestCasesPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'executions':
        return <ExecutionPage />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-container">
            {/* Top Stats Row */}
            <div className="grid-stats">
              <StatCard
                title="Total Test Cases"
                value={metrics.totalTestCases}
                icon={<FileText size={20} />}
                trend={{ value: 12, isPositive: true }}
                subtext="Across all projects"
                onClick={() => handleNavigate('test-cases')}
              />
              <StatCard
                title="Pass Rate"
                value={`${metrics.passRate}%`}
                icon={<CheckCircle size={20} color="var(--success)" />}
                trend={{ value: 0.5, isPositive: true }}
                subtext="Last 24 hours"
              />
              <StatCard
                title="Total Builds"
                value={metrics.totalBuilds}
                icon={<Activity size={20} color="var(--info)" />}
                subtext="This month"
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid-charts-row-1">
              <div className="widget-wrapper span-1">
                <PieChartWidget />
              </div>
              <div className="widget-wrapper span-1">
                <FlakyTestsWidget />
              </div>
              <div className="widget-wrapper span-1">
                <NewCasesTrendWidget />
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid-charts-row-2">
              <div className="widget-wrapper span-2">
                <BarChartWidget />
              </div>
              <div className="widget-wrapper span-2">
                <BuildTrendWidget />
              </div>
            </div>

            <style>{`
              .dashboard-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                max-width: 1600px;
                margin: 0 auto;
              }

              .grid-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 1.5rem;
              }

              .grid-charts-row-1 {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
              }

              .grid-charts-row-2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
              }

              .widget-wrapper {
                height: 100%;
                min-height: 350px;
              }

              /* Responsive Breakpoints */
              @media (max-width: 1200px) {
                .grid-charts-row-1 {
                  grid-template-columns: repeat(2, 1fr);
                }
                 .grid-charts-row-2 {
                  grid-template-columns: 1fr;
                }
              }

              @media (max-width: 768px) {
                 .grid-charts-row-1, .grid-charts-row-2 {
                  grid-template-columns: 1fr;
                }
              }
            `}</style>
          </div>
        );
    }
  };

  return (
    <Layout
      currentView={currentView}
      onNavigate={handleNavigate}
      onGenerateReport={handleGenerateReport}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
