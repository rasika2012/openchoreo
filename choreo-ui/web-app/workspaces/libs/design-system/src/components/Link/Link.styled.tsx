import { LinkProps, styled, Link } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledLinkProps extends LinkProps {
  disabled?: boolean;
  testId: string;
}

export const StyledLink: ComponentType<StyledLinkProps> = styled(
  Link
)<StyledLinkProps>(({ disabled }) => ({
  opacity: disabled ? 0.4 : 1,
  cursor: disabled ? 'default' : 'pointer',
  backgroundColor: 'transparent',
  pointerEvents: disabled ? 'none' : 'auto',
}));
