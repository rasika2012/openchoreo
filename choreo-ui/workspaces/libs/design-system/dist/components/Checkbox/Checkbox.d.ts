import React from 'react';
export type CheckboxSize = 'small' | 'medium';
export type CheckboxColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export interface CheckboxProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    name?: string;
    value?: string;
    size?: CheckboxSize;
    color?: CheckboxColor;
    disableRipple?: boolean;
    sx?: React.CSSProperties;
    [key: string]: any;
}
/**
 * Checkbox component
 * @component
 */
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
