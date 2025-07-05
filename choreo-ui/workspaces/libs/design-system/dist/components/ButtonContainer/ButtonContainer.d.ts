import React from 'react';
export interface ButtonContainerProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    align?: 'left' | 'center' | 'right' | 'space-between';
    marginTop?: 'sm' | 'md' | 'lg';
    testId: string;
}
export declare const ButtonContainer: React.ForwardRefExoticComponent<ButtonContainerProps & React.RefAttributes<HTMLDivElement>>;
