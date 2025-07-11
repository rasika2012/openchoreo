import React from 'react';
import { StyledButton } from './Button.styled';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';
export type ButtonVariant =
  | 'contained'
  | 'outlined'
  | 'text'
  | 'subtle'
  | 'link';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: ButtonSize;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  className?: string;
  disableRipple?: boolean;
  pill?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /**
   * Test id for the button
   */
  testId?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      disabled = false,
      size = 'medium',
      onClick,
      color = 'primary',
      className,
      disableRipple = true,
      pill = false,
      fullWidth = false,
      startIcon,
      endIcon,
      testId,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant === 'subtle' || variant === 'link' ? 'text' : variant}
        disabled={disabled}
        size={size === 'tiny' ? 'small' : size}
        onClick={onClick}
        color={color}
        className={`${className || ''} 
        ${variant === 'subtle' ? 'subtle' : ''} 
        ${variant === 'link' ? 'link' : ''} 
        ${pill ? 'pill' : ''} ${variant === 'subtle' ? `subtle-${color}` : ''} 
        ${variant === 'link' ? `link-${color}` : ''}`}
        disableRipple={disableRipple}
        fullWidth={fullWidth}
        data-testid={testId}
        startIcon={startIcon}
        endIcon={endIcon}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
