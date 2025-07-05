import { TableRowProps as MUITableRowProps } from '@mui/material';
interface TableRowProps extends MUITableRowProps {
    deletable?: boolean;
    disabled?: boolean;
    noBorderBottom?: boolean;
}
export declare const StyledTableRow: React.ComponentType<TableRowProps>;
export {};
