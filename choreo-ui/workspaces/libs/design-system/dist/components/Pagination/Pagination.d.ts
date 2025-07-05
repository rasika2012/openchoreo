import React from 'react';
export interface PaginationProps {
    /** Additional CSS class names */
    className?: string;
    /** Click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Whether the component is disabled */
    disabled?: boolean;
    count?: number;
    rowsPerPageOptions: number[];
    rowsPerPage: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (value: string) => void;
    rowsPerPageLabel?: React.ReactNode;
    testId: string;
    sx?: React.CSSProperties;
}
/**
 * Pagination component
 * @component
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;
