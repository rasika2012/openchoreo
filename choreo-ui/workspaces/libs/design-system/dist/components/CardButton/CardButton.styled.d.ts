import { ButtonProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledCardButtonProps extends ButtonProps {
    disabled?: boolean;
}
export declare const StyledCardButton: ComponentType<StyledCardButtonProps>;
