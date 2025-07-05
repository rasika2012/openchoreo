import React from 'react';
export type colorVariant = 'primary' | 'default' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type tagVariant = 'filled' | 'outlined' | 'text';
export type tagSize = 'small' | 'medium' | 'large';
export interface TagProps {
    /**
     * The content of the component
     */
    children?: React.ReactNode;
    /**
     * Additional className for the component
     */
    className?: string;
    /**
     * If true, the component will be disabled
     */
    disabled?: boolean;
    /**
     * The color variant of the tag
     */
    color?: colorVariant;
    /**
     * The variant of the tag
     */
    variant?: tagVariant;
    /**
     * The size of the tag
     */
    size?: tagSize;
    testId: string;
    /**
     * The sx prop for custom styles
     */
    sx?: React.CSSProperties;
    /**
     * If true, the tag is read-only and cannot be deleted
     */
    readOnly?: boolean;
    /**
     * Additional props for MUI Chip
     */
    [key: string]: any;
}
export declare const Tag: React.ForwardRefExoticComponent<Omit<TagProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
