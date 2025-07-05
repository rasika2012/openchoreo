import React from 'react';
export type sizeVariant = 'sm' | 'md' | 'lg';
export interface NoDataMessageProps {
    message?: React.ReactNode;
    size?: sizeVariant;
    testId?: string;
    className?: string;
}
/**
 * NoDataMessage component
 * @component
 */
export declare const NoDataMessage: React.ForwardRefExoticComponent<NoDataMessageProps & React.RefAttributes<HTMLDivElement>>;
