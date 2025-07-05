import React, { ReactNode } from 'react';
export type CardBorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'square';
export type CardBoxShadow = 'none' | 'light' | 'dark';
export type CardBgColor = 'default' | 'secondary';
export interface CardProps {
    children?: ReactNode;
    borderRadius?: CardBorderRadius;
    boxShadow?: CardBoxShadow;
    disabled?: boolean;
    testId: string;
    bgColor?: CardBgColor;
    className?: string;
    fullHeight?: boolean;
    variant?: 'elevation' | 'outlined';
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
}
export declare const Card: ({ children, borderRadius, boxShadow, disabled, variant, testId, fullHeight, bgColor, ...rest }: CardProps) => import("react/jsx-runtime").JSX.Element;
