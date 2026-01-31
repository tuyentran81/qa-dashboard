import React, { useState } from 'react';
import { Save, Bell, Globe, Moon, Shield } from 'lucide-react';

const Section = ({ icon, title, children }) => (
    <div className="settings-section">
        <div className="section-header">
            {icon}
            <h4>{title}</h4>
        </div>
        <div className="section-content">
            {children}
        </div>
    </div>
);

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        projectName: 'QA Dashboard',
        projectUrl: 'https://github.com/my-org/qa-dashboard',
        emailNotifications: true,
        slackNotifications: false,
        theme: 'dark'
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h3 className="page-title">Settings</h3>
            </div>

            <form onSubmit={handleSave} className="settings-form">

                <Section icon={<Globe size={20} />} title="General Settings">
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={settings.projectName}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Repository URL</label>
                        <input
                            type="text"
                            name="projectUrl"
                            value={settings.projectUrl}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </Section>

                <Section icon={<Bell size={20} />} title="Notifications">
                    <div className="toggle-group">
                        <div className="toggle-label">
                            <span>Email Notifications</span>
                            <small>Receive daily summaries via email</small>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle-group">
                        <div className="toggle-label">
                            <span>Slack Integration</span>
                            <small>Post failing tests to #qa-alerts</small>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                name="slackNotifications"
                                checked={settings.slackNotifications}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </Section>

                <Section icon={<Moon size={20} />} title="Appearance">
                    <div className="form-group">
                        <label>Theme Preference</label>
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="dark">Dark Mode</option>
                            <option value="light">Light Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                </Section>

                <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={isSaving}>
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            <style>{`
                .page-container {
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .page-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .settings-section {
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                }
                .section-header {
                    padding: 1rem 1.5rem;
                    background: var(--bg-secondary);
                    border-bottom: 1px solid var(--glass-border);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: var(--text-primary);
                }
                .section-header h4 {
                    font-size: 1rem;
                    font-weight: 500;
                    margin: 0;
                }
                .section-content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }
                .form-input, .form-select {
                    background: var(--bg-hover);
                    border: 1px solid var(--glass-border);
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    outline: none;
                    transition: border-color 0.2s;
                }
                .form-input:focus, .form-select:focus {
                    border-color: var(--primary);
                }

                .toggle-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .toggle-label {
                    display: flex;
                    flex-direction: column;
                }
                .toggle-label span {
                    font-size: 0.9rem;
                    color: var(--text-primary);
                }
                .toggle-label small {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                /* Toggle Switch */
                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 24px;
                }
                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-secondary);
                    transition: .4s;
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 2px;
                    bottom: 2px;
                    background-color: var(--text-muted);
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }
                input:checked + .slider:before {
                    transform: translateX(20px);
                    background-color: white;
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                }
                .save-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-md);
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: opacity 0.2s;
                }
                .save-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;
