import React from 'react';
export interface CardDropdownProps {
    icon: React.ReactNode;
    text: React.ReactNode;
    active?: boolean;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    disabled?: boolean;
    'data-cyid'?: string;
    testId: string;
    size?: 'small' | 'medium' | 'large';
    fullHeight?: boolean;
}
/**
 * CardDropdown component
 * @component
 */
export declare const CardDropdown: React.ForwardRefExoticComponent<CardDropdownProps & React.RefAttributes<HTMLDivElement>>;
