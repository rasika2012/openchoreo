import React from 'react';
import { StyledCheckbox } from './Checkbox.styled';
import { Checkbox as MUICheckbox } from '@mui/material';

export type CheckboxSize = 'small' | 'medium';

export type CheckboxColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface CheckboxProps {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Additional className for the component
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  /**
   * If true, the checkbox is checked
   */
  checked?: boolean;
  /**
   * If true, the checkbox shows indeterminate state
   */
  indeterminate?: boolean;
  /**
   * The name of the checkbox
   */
  name?: string;
  /**
   * The value of the checkbox
   */
  value?: string;
  /**
   * The size of the checkbox
   */
  size?: CheckboxSize;
  /**
   * The color of the checkbox
   */
  color?: CheckboxColor;
  /**
   * disable ripple effect
   */
  disableRipple?: boolean;
  /**
   * The sx prop for custom styles
   */
  sx?: React.CSSProperties;
  /** * Additional props for MUI Checkbox
   */
  [key: string]: any;
}

/**
 * Checkbox component
 * @component
 */
export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    return (
      <StyledCheckbox
        ref={ref}
        className={className}
        disabled={disabled}
        {...props}
      >
        <MUICheckbox
          {...props}
          className={className}
          checked={props.checked}
          indeterminate={props.indeterminate}
          name={props.name}
          value={props.value}
          size={props.size}
          disabled={disabled}
          onClick={onClick}
          color={props.color}
          sx={props.sx}
        />
        <span>{children}</span>
      </StyledCheckbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';
