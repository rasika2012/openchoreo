import { BoxProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledSimpleSelectProps extends BoxProps {
    disabled?: boolean;
    size?: 'small' | 'medium';
    isSearchBarItem?: boolean;
}
export declare const StyledSimpleSelect: ComponentType<StyledSimpleSelectProps>;
