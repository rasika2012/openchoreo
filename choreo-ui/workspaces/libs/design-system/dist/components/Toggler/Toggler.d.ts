import React from 'react';
export type colorVariant = 'primary' | 'default';
export type sizeVariant = 'small' | 'medium';
export interface TogglerProps {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    size?: sizeVariant;
    checked?: boolean;
    color?: colorVariant;
    sx?: React.CSSProperties;
    testId?: string;
}
/**
 * Toggler component
 * @component
 */
export declare const Toggler: React.ForwardRefExoticComponent<TogglerProps & React.RefAttributes<HTMLButtonElement>>;
