import { LinkProps } from '@mui/material';
import { ComponentType } from 'react';
export interface StyledLinkProps extends LinkProps {
    disabled?: boolean;
    testId: string;
}
export declare const StyledLink: ComponentType<StyledLinkProps>;
