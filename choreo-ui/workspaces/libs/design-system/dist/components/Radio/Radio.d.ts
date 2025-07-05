import React from 'react';
export type colorVariant = 'primary' | 'default' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type sizeVariant = 'small' | 'medium' | 'large';
export interface RadioProps {
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
     * The color variant of the radio
     */
    color?: colorVariant;
    /**
     * The size variant of the radio
     */
    size?: sizeVariant;
    /**
     * The sx prop for custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Theme object for styled components or MUI
     */
    theme?: any;
    /**
     * Additional props for MUI Radio
     */
    [key: string]: any;
}
/**
 * Radio component
 * @component
 */
export declare const Radio: React.ForwardRefExoticComponent<Omit<RadioProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
