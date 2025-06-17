import React from 'react';
import { StyledTooltipBase } from './TooltipBase.styled';

export interface TooltipBaseProps {
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
 * TooltipBase component
 * @component
 */
export const TooltipBase = React.forwardRef<HTMLDivElement, TooltipBaseProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const child = React.isValidElement(children) ? (
      React.cloneElement(children, {
        ...props,
      })
    ) : (
      <span
        ref={ref}
        onClick={disabled ? undefined : onClick}
        className={className}
        {...props}
      >
        {children}
      </span>
    );

    return (
      <StyledTooltipBase title={children} disabled={disabled}>
        {child}
      </StyledTooltipBase>
    );
  }
);

TooltipBase.displayName = 'TooltipBase';
