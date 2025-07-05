import React from 'react';
interface CardHeadingProps {
    title: React.ReactNode | string;
    onClose?: () => void;
    testId: string;
    size?: 'small' | 'medium' | 'large';
}
export declare function CardHeading(props: CardHeadingProps): import("react/jsx-runtime").JSX.Element;
export {};
