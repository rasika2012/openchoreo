import React from 'react';
export interface CardFormProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    /** The header content */
    header?: React.ReactNode;
    /** Additional CSS class names */
    className?: string;
    /** Click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Test ID for component */
    testId?: string;
}
/**
 * CardForm component
 * @component
 */
export declare const CardForm: React.ForwardRefExoticComponent<CardFormProps & React.RefAttributes<HTMLDivElement>>;
