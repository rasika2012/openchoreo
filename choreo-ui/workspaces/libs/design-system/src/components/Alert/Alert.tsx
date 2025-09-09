import React from 'react';
import { StyledAlert } from './Alert.styled';

export interface AlertProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the component is disabled */
  disabled: boolean;
  /** The severity of the alert */
  severity: 'error' | 'warning' | 'info' | 'success';
  /** The icon to be rendered within the component */
  icon?: React.ReactNode;
}

/**
 * Alert component
 * @component
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <StyledAlert ref={ref} className={className} {...props}>
        {children}
      </StyledAlert>
    );
  }
);

Alert.displayName = 'Alert';
