import React from 'react';
export interface SelectMenuItemProps {
    disabled?: boolean;
    testId: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
    value?: number;
}
export declare const SelectMenuItem: (props: SelectMenuItemProps) => import("react/jsx-runtime").JSX.Element;
