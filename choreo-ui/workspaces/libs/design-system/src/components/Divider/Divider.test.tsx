import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
    it('should render children correctly', () => {
        render(<Divider>Test Content</Divider>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Divider className="custom-class">Content</Divider>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<Divider onClick={handleClick}>Clickable</Divider>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <Divider disabled onClick={handleClick}>
                Disabled
            </Divider>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
