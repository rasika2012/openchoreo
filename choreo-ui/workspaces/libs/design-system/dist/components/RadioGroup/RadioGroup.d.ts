import React from 'react';
export interface RadioGroupProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    /** Additional CSS class names */
    className?: string;
    /** Click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Whether the component is disabled */
    disabled?: boolean;
    /**
     * If true, the component will be displayed in a horizontal layout
     */
    row?: boolean;
    /**
     * The sx prop for custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional props for MUI RadioGroup
     */
    [key: string]: any;
}
/**
 * RadioGroup component
 * @component
 */
export declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
