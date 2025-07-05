import { ComponentType } from 'react';
export interface StyledRadioGroupProps {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    row?: boolean;
    children?: React.ReactNode;
}
export declare const StyledRadioGroup: ComponentType<StyledRadioGroupProps>;
