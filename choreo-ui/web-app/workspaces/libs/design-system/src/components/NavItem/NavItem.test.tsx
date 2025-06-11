import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavItem } from './NavItem';

describe('NavItem', () => {
    it('should render title correctly', () => {
        render(<NavItem title="Test Content" />);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <NavItem className="custom-class" title="Content" />
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<NavItem onClick={handleClick} title="Clickable" />);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <NavItem disabled onClick={handleClick} title="Disabled" />
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
