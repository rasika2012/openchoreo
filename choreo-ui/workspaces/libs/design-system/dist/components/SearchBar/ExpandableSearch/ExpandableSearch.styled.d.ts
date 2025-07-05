import { BoxProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledAutofocusFieldProps extends BoxProps {
    disabled?: boolean;
    size?: 'small' | 'medium';
}
export declare const StyledAutofocusField: ComponentType<StyledAutofocusFieldProps>;
export interface StyledExpandableSearchProps extends BoxProps {
    disabled?: boolean;
    direction?: 'left' | 'right';
    isOpen?: boolean;
}
export declare const StyledExpandableSearch: ComponentType<StyledExpandableSearchProps>;
