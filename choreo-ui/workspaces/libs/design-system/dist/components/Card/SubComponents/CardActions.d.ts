import React from 'react';
import { SxProps, Theme } from '@mui/material';
interface CardActionsProps {
    children: React.ReactNode;
    testId: string;
    sx?: SxProps<Theme>;
}
export declare const CardActions: ({ children, testId, sx, ...rest }: CardActionsProps) => import("react/jsx-runtime").JSX.Element;
export {};
