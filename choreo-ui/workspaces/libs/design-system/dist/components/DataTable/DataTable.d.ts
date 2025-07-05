import React, { JSX } from 'react';
export type DataTableColumn<T> = {
    title: string;
    field: string;
    render?: (rowData: T, isHover: boolean) => JSX.Element | null;
    customFilterAndSearch?: (term: string, rowData: T) => boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
    headerStyle?: React.CSSProperties;
};
export interface DataTableProps<T> {
    enableFrontendSearch?: boolean;
    searchQuery: string;
    isLoading: boolean;
    testId: string;
    columns: DataTableColumn<T>[];
    data: T[];
    totalRows?: number;
    getRowId(rowData: T): string;
    onRowClick?: (row: any) => void;
}
/**
 * DataTable component
 * @component
 */
export declare const DataTable: {
    <T>(props: DataTableProps<T> & {
        ref?: React.Ref<HTMLDivElement>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
