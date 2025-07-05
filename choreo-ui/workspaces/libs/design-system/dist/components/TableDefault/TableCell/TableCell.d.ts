import { TableCellProps as MUITableCellProps } from '@mui/material';
export interface TableCellProps extends MUITableCellProps {
    children?: React.ReactNode;
}
export declare const TableCell: React.FC<TableCellProps>;
