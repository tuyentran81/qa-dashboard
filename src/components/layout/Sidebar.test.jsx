import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
    it('renders all navigation items', () => {
        render(<Sidebar currentView="dashboard" onNavigate={() => { }} />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Test Cases')).toBeInTheDocument();
        expect(screen.getByText('Analytics')).toBeInTheDocument();
        expect(screen.getByText('Executions')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('highlights the active item based on currentView', () => {
        render(<Sidebar currentView="test-cases" onNavigate={() => { }} />);
        const activeItem = screen.getByText('Test Cases').closest('.nav-item');
        expect(activeItem).toHaveClass('active');
    });

    it('calls onNavigate with correct id when clicked', () => {
        const handleNavigate = vi.fn();
        render(<Sidebar currentView="dashboard" onNavigate={handleNavigate} />);

        fireEvent.click(screen.getByText('Analytics'));
        expect(handleNavigate).toHaveBeenCalledWith('analytics');
    });
});
