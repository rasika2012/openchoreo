import React from 'react';
import { StyledToggler } from './Toggler.styled';

export type colorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type sizeVariant = 'small' | 'medium';

export interface TogglerProps {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  size?: sizeVariant;
  checked?: boolean;
  color?: colorVariant;
  sx?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Toggler component
 * @component
 */
export const Toggler = React.forwardRef<HTMLButtonElement, TogglerProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(event);
    };

    return (
      <StyledToggler
        ref={ref}
        size={props.size || 'medium'}
        className={className}
        onClick={disabled ? disabled : handleChange}
        disabled={disabled}
        checked={props.checked}
        color={props.color}
        disableRipple={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        {...props}
      />
    );
  }
);

Toggler.displayName = 'Toggler';
