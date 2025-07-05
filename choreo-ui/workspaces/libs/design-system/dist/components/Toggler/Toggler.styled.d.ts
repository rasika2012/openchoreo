import { SwitchProps } from '@mui/material';
import { ComponentType } from 'react';
export type colorVariant = 'primary' | 'default';
export type sizeVariant = 'small' | 'medium';
export interface StyledTogglerProps extends SwitchProps {
    disabled?: boolean;
    size?: sizeVariant;
    color?: colorVariant;
}
export declare const StyledToggler: ComponentType<StyledTogglerProps>;
