import React from 'react';
export type colorVariant = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export type buttonVariant = 'text' | 'outlined' | 'contained';
export type sizeVariant = 'small' | 'medium' | 'large';
export interface SplitButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    label?: string;
    selectedValue: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startIcon?: React.ReactNode;
    color?: colorVariant;
    variant?: buttonVariant;
    size?: sizeVariant;
    testId?: string;
    fullWidth?: boolean;
    sx?: React.CSSProperties;
}
/**
 * SplitButton component
 * @component
 */
export declare const SplitButton: React.ForwardRefExoticComponent<SplitButtonProps & React.RefAttributes<HTMLDivElement>>;
