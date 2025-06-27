import React from 'react';
import { StyledCardDropdown } from './CardDropdown.styled';

export interface CardDropdownProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * CardDropdown component
 * @component
 */
export const CardDropdown = React.forwardRef<HTMLDivElement, CardDropdownProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <StyledCardDropdown
        ref={ref}
        className={className}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </StyledCardDropdown>
    );
  }
);

CardDropdown.displayName = 'CardDropdown';
