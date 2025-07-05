import React from 'react';
export interface TypographyProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    className?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'subtitle1' | 'subtitle2';
    monospace?: boolean;
    color?: string;
}
/**
 * Typography component
 * @component
 */
export declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLDivElement>>;
