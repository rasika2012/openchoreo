import React from 'react';
export interface TooltipBaseProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    /** The tooltip content */
    title?: React.ReactNode;
    /** Additional CSS class names */
    className?: string;
    /** Click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
/**
 * TooltipBase component
 * @component
 */
export declare const TooltipBase: React.ForwardRefExoticComponent<TooltipBaseProps & React.RefAttributes<HTMLDivElement>>;
