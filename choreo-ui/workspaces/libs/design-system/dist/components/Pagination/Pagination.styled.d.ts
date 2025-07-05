import { Theme } from '@mui/material';
export interface StyledPaginationProps {
    theme?: Theme;
    children?: React.ReactNode;
    className?: string;
    testId?: string;
    ref?: React.Ref<HTMLDivElement>;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const StyledPagination: React.ComponentType<StyledPaginationProps>;
export interface StyledDivProps {
    theme?: Theme;
    className?: string;
    children?: React.ReactNode;
}
export declare const StyledDiv: React.ComponentType<StyledDivProps>;
