import { TextFieldProps } from '@mui/material/TextField';
import type { FormControlProps } from '@mui/material/FormControl';
import { ComponentType } from 'react';
type CustomTextFieldProps = TextFieldProps & {
    customSize?: 'small' | 'medium' | 'large';
};
export declare const StyledTextField: ComponentType<CustomTextFieldProps>;
export declare const StyledFormControl: ComponentType<FormControlProps>;
export declare const HeadingWrapper: ComponentType<any>;
export {};
