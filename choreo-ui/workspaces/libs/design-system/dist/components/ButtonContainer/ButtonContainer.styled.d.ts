import { BoxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import React from 'react';
interface StyledButtonContainerProps {
    disabled?: boolean;
    align?: 'left' | 'center' | 'right' | 'space-between';
    marginTop?: 'sm' | 'md' | 'lg';
    theme?: Theme;
}
export declare const StyledButtonContainer: React.ComponentType<BoxProps & StyledButtonContainerProps>;
export {};
