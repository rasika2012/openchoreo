import React from 'react';
export type ProgressBarVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export type ProgressBarColor = 'primary' | 'secondary' | 'inherit';
export type ProgressBarSize = 'small' | 'medium' | 'large';
export interface ProgressBarProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    variant?: ProgressBarVariant;
    color?: ProgressBarColor;
    value?: number;
    valueBuffer?: number;
    size?: ProgressBarSize;
    sx?: React.CSSProperties;
    [key: string]: any;
}
/**
 * ProgressBar component
 * @component
 */
export declare const ProgressBar: React.ForwardRefExoticComponent<Omit<ProgressBarProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
