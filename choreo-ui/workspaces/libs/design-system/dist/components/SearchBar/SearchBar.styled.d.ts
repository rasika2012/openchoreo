import { BoxProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledSearchBarProps extends BoxProps {
    disabled?: boolean;
    size?: 'small' | 'medium';
    color?: 'primary' | 'secondary';
    bordered?: boolean;
    focused?: boolean;
    filter?: boolean;
}
export declare const StyledSearchBar: ComponentType<StyledSearchBarProps>;
