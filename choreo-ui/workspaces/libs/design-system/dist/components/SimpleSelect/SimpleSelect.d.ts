import React from 'react';
import { PopoverOrigin, SelectChangeEvent } from '@mui/material';
export type sizeVariant = 'small' | 'medium';
export interface SimpleSelectProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    testId: string;
    onChange: (event: SelectChangeEvent<unknown>) => void;
    value: unknown;
    error?: boolean;
    size?: sizeVariant;
    helperText?: React.ReactNode;
    renderValue?: (value: unknown) => React.ReactNode;
    resetStyles?: boolean;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    isLoading?: boolean;
    isScrollable?: boolean;
    startAdornment?: React.ReactNode;
    isSearchBarItem?: boolean;
}
/**
 * SimpleSelect component
 * @component
 */
export declare const SimpleSelect: React.ForwardRefExoticComponent<SimpleSelectProps & React.RefAttributes<HTMLDivElement>>;
