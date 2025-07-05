import React from 'react';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
export type ButtonSize = 'tiny' | 'small' | 'medium';
export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'subtle' | 'link';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    href?: string;
    /**
     * Test id for the button
     */
    testId?: string;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
