export interface TableRowProps {
    children?: React.ReactNode;
    deletable?: boolean;
    disabled?: boolean;
    noBorderBottom?: boolean;
    onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}
export declare const TableRow: React.FC<TableRowProps>;
