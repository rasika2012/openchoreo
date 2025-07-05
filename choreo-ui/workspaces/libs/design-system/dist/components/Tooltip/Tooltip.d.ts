import React from 'react';
export type tooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export interface TooltipProps {
    /**
     * The content of the component
     */
    children?: React.ReactNode;
    /**
     * Additional className for the component
     */
    className?: string;
    /**
     * arrow to the tooltip
     */
    arrow?: boolean;
    /**
     * placement of the tooltip
     */
    placement?: tooltipPlacement;
    /**
     * title of the tooltip
     */
    title?: string;
    /**
     * Optional click handler
     */
    onClick?: (event: React.MouseEvent) => void;
    /**
     * content of the tooltip
     */
    content?: React.ReactNode;
    /**
     * example to be displayed in the tooltip
     */
    example?: React.ReactNode;
    action?: {
        link: string;
        text: string;
    };
    /**
     * sx prop for styling
     */
    sx?: React.CSSProperties;
    /**
     * Additional props for the tooltip
     */
    [key: string]: any;
}
/**
 * Tooltip component
 * @component
 */
export declare const Tooltip: React.ForwardRefExoticComponent<Omit<TooltipProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
