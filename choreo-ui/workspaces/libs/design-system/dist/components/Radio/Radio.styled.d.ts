import { Theme, RadioProps as MuiRadioProps } from '@mui/material';
import { ComponentType } from 'react';
export type colorVariant = 'primary' | 'default' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export interface StyledRadioProps {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    theme?: Theme;
}
export declare const StyledRadio: ComponentType<StyledRadioProps>;
export interface RadioIndicatorProos {
    color?: colorVariant;
}
export declare const StyledRadioIndicator: ComponentType<MuiRadioProps & RadioIndicatorProos>;
