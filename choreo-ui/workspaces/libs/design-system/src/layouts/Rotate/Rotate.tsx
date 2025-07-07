import React from 'react';
import { StyledRotate } from './Rotate.styled';

export interface RotateProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Rotate component
 * @component
 */
export const Rotate = React.forwardRef<HTMLDivElement, RotateProps>(
  ({ children, disabled = false, ...props }, ref) => {

    return (
      <StyledRotate
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </StyledRotate>
    );
  }
);

Rotate.displayName = 'Rotate';
