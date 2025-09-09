import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
    it('should render children correctly', () => {
        render(<Alert disabled severity="error">Test Content</Alert>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Alert disabled severity="error" className="custom-class">Content</Alert>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<Alert disabled severity="error" onClick={handleClick}>Clickable</Alert>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <Alert disabled severity="error" onClick={handleClick}>
                Disabled
            </Alert>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
