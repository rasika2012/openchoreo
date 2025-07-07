import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rotate } from './Rotate';

describe('Rotate', () => {
    it('should render children correctly', () => {
        render(<Rotate>Test Content</Rotate>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Rotate className="custom-class">Content</Rotate>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<Rotate onClick={handleClick}>Clickable</Rotate>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <Rotate disabled onClick={handleClick}>
                Disabled
            </Rotate>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
