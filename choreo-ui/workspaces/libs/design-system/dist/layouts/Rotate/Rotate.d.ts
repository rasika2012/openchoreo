import React from 'react';
export interface RotateProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    children?: React.ReactNode;
}
/**
 * Rotate component
 * @component
 */
export declare const Rotate: React.ForwardRefExoticComponent<RotateProps & React.RefAttributes<HTMLDivElement>>;
