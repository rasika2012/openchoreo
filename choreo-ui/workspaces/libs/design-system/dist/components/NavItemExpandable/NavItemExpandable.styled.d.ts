import { BoxProps } from '@mui/material';
import { ComponentType } from 'react';
import { LinkProps } from 'react-router';
interface StyledNavItemContainerProps {
    isSubNavVisible?: boolean;
    isExpanded?: boolean;
    disabled?: boolean;
}
export declare const StyledNavItemContainer: ComponentType<BoxProps & StyledNavItemContainerProps>;
interface StyledSubNavContainerProps {
    isSelected?: boolean;
}
export declare const StyledSubNavContainer: ComponentType<BoxProps & StyledSubNavContainerProps>;
export declare const StyledMainNavItemContainer: ComponentType<BoxProps & {
    isExpanded?: boolean;
    isSelected?: boolean;
    isSubNavVisible?: boolean;
}>;
export declare const StyledMainNavItemContainerWithLink: ComponentType<LinkProps & {
    isSelected?: boolean;
    isSubNavVisible?: boolean;
}>;
export declare const StyledSubNavItemContainer: ComponentType<LinkProps & {
    isExpanded?: boolean;
    isSelected?: boolean;
}>;
export declare const StyledSpinIcon: ComponentType<BoxProps & {
    isSubNavVisible: boolean;
    isExpanded?: boolean;
}>;
export {};
