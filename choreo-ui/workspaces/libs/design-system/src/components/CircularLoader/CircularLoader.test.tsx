import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CircularLoader } from './CircularLoader';

describe('CircularLoader', () => {
    it('should render children correctly', () => {
        render(<CircularLoader>Test Content</CircularLoader>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <CircularLoader className="custom-class">Content</CircularLoader>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<CircularLoader onClick={handleClick}>Clickable</CircularLoader>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <CircularLoader disabled onClick={handleClick}>
                Disabled
            </CircularLoader>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
