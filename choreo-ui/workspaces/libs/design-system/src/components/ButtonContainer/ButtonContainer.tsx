import React from 'react';
import { StyledButtonContainer } from './ButtonContainer.styled';
import { useTheme } from '@mui/material/styles';

export interface ButtonContainerProps {
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
   * Alignment of the content
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /**
   * top of the margin
   */
  marginTop?: 'sm' | 'md' | 'lg';
  testId: string;
}

export const ButtonContainer = React.forwardRef<
  HTMLDivElement,
  ButtonContainerProps
>(({ children, className, onClick, disabled = false, ...props }, ref) => {
  return (
    <StyledButtonContainer
      ref={ref}
      className={className}
      theme={useTheme()}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButtonContainer>
  );
});

ButtonContainer.displayName = 'ButtonContainer';
