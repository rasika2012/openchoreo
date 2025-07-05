import React from 'react';
export interface CardButtonProps {
    icon: React.ReactNode;
    text: React.ReactNode;
    active?: boolean;
    error?: boolean;
    onClick?: () => void;
    testId: string;
    size?: 'small' | 'medium' | 'large';
    fullHeight?: boolean;
    disabled?: boolean;
    endIcon?: React.ReactNode;
}
/**
 * CardButton component
 * @component
 */
export declare const CardButton: React.ForwardRefExoticComponent<CardButtonProps & React.RefAttributes<HTMLDivElement>>;
