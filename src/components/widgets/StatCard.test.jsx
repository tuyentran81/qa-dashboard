import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StatCard from './StatCard';
import { FileText } from 'lucide-react';

describe('StatCard', () => {
    it('renders title and value', () => {
        render(<StatCard title="Test Title" value="123" icon={<FileText />} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<StatCard title="Test" value="0" icon={<FileText />} onClick={handleClick} />);

        fireEvent.click(screen.getByText('Test').closest('.stat-card'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies clickable class when onClick is provided', () => {
        const { container } = render(<StatCard title="Test" value="0" icon={<FileText />} onClick={() => { }} />);
        expect(container.firstChild).toHaveClass('clickable');
    });
});
