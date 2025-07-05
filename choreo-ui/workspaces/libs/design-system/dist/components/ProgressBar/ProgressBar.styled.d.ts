import { LinearProgressProps } from '@mui/material';
import { ComponentType } from 'react';
export type ProgressBarSize = 'small' | 'medium' | 'large';
export type ProgressBarVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export type ProgressBarColor = 'primary' | 'secondary' | 'inherit';
export interface StyledProgressBarProps extends LinearProgressProps {
    disabled?: boolean;
    size?: ProgressBarSize;
    variant?: ProgressBarVariant;
    color?: ProgressBarColor;
}
export declare const StyledProgressBar: ComponentType<StyledProgressBarProps>;
