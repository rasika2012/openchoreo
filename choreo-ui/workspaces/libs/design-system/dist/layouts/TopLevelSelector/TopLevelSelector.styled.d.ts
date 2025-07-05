import { CardProps, PopoverProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledTopLevelSelectorProps {
    disabled?: boolean;
    isHighlighted?: boolean;
}
export declare const StyledTopLevelSelector: ComponentType<StyledTopLevelSelectorProps & CardProps>;
export declare const StyledPopover: ComponentType<PopoverProps>;
