import React from 'react';
import { SxProps, Theme } from '@mui/material';
interface CardContentProps {
    children: React.ReactNode;
    paddingSize?: 'md' | 'lg';
    fullHeight?: boolean;
    testId?: string;
    sx?: SxProps<Theme>;
}
export declare const CardContent: ({ children, paddingSize, fullHeight, testId, sx, }: CardContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
