import { TooltipProps, AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material';
import React from 'react';
interface ISelectProps<T> extends Omit<AutocompleteProps<T, false, boolean, false>, 'renderInput' | 'onChange' | 'renderOption'> {
    name: string;
    label?: string;
    labelId: string;
    tooltip?: React.ReactNode;
    tooltipPlacement?: TooltipProps['placement'];
    helperText?: React.ReactNode;
    loadingText?: string;
    error?: boolean;
    optional?: boolean;
    addBtnText?: string;
    onAddClick?: () => void;
    getOptionLabel: (val: string | T) => string;
    getOptionIcon?: (val: T) => string;
    onChange: (val: T | null) => void;
    value: T | null;
    getOptionValue?: (val: T) => string | number;
    InputProps?: Partial<AutocompleteRenderInputParams['InputProps']>;
    startIcon?: React.ReactNode;
    info?: React.ReactNode;
    actions?: React.ReactNode;
    renderOption?: (optionVal: T) => React.ReactNode;
    enableOverflow?: boolean;
    getOptionDisabled?: (option: T) => boolean;
    testId: string;
    isClearable?: boolean;
    isLoading?: boolean;
    getOptionSelected?: (option: T, value: T) => boolean;
    placeholder?: string;
}
export declare const Select: <T>(props: ISelectProps<T> & {
    ref?: React.Ref<any>;
}) => React.ReactElement & {
    displayName?: string;
};
export {};
