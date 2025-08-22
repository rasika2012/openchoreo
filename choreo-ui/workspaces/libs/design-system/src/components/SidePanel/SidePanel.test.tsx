import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidePanel } from './SidePanel';

describe('SidePanel', () => {
    it('should render children correctly', () => {
        render(<SidePanel>Test Content</SidePanel>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <SidePanel className="custom-class">Content</SidePanel>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<SidePanel onClick={handleClick}>Clickable</SidePanel>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <SidePanel disabled onClick={handleClick}>
                Disabled
            </SidePanel>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
