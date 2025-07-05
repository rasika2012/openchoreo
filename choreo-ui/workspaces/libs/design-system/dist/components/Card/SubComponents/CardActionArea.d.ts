import React from 'react';
import { SxProps, Theme } from '@mui/material';
interface CardActionAreaProps {
    children: React.ReactNode;
    variant?: 'elevation' | 'outlined';
    testId: string;
    fullHeight?: boolean;
    sx?: SxProps<Theme>;
    onClick?: () => void;
    disabled?: boolean;
}
export declare const CardActionArea: ({ children, variant, testId, fullHeight, sx, ...rest }: CardActionAreaProps) => import("react/jsx-runtime").JSX.Element;
export {};
