import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorCard } from './ErrorCard';

describe('ErrorCard', () => {
    it('should render children correctly', () => {
        render(<ErrorCard>Test Content</ErrorCard>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <ErrorCard className="custom-class">Content</ErrorCard>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<ErrorCard onClick={handleClick}>Clickable</ErrorCard>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <ErrorCard disabled onClick={handleClick}>
                Disabled
            </ErrorCard>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
