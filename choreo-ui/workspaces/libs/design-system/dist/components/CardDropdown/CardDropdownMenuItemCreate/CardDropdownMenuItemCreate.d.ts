import React from 'react';
export interface CardDropdownMenuItemCreateProps {
    createText: string;
    testId: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    disabled?: boolean;
}
export declare const CardDropdownMenuItemCreate: React.ForwardRefExoticComponent<CardDropdownMenuItemCreateProps & React.RefAttributes<HTMLLIElement>>;
