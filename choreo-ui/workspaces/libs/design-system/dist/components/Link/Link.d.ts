import React from 'react';
export type linkVariant = 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2';
export type linkColorVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'textPrimary' | 'textSecondary' | 'textDisabled' | 'inherit' | 'textHint';
export type underlineVariant = 'none' | 'hover' | 'always';
export interface LinkProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    variant?: linkVariant;
    color?: linkColorVariant;
    testId: string;
    underline?: underlineVariant;
    sx?: React.CSSProperties;
    [key: string]: any;
}
export declare const Link: React.ForwardRefExoticComponent<Omit<LinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
