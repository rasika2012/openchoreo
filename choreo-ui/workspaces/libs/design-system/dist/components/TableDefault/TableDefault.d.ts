import React from 'react';
export interface TableDefaultProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    /** Additional CSS class names */
    className?: string;
    /** The variant style for the table */
    variant: 'dark' | 'default';
    testId?: string;
}
export declare const TableDefault: React.ForwardRefExoticComponent<TableDefaultProps & React.RefAttributes<HTMLTableElement>>;
