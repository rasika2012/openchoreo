export interface TableSortLabelProps {
    children?: React.ReactNode;
    direction?: 'asc' | 'desc';
    active?: boolean;
    onClick?: (event: React.MouseEvent<unknown>) => void;
}
export declare const TableSortLabel: React.FC<TableSortLabelProps>;
