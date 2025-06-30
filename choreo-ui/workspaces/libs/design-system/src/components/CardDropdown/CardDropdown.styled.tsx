import { Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledCardDropdownProps {
  disabled?: boolean;
}

export const StyledCardDropdown: ComponentType<
  StyledCardDropdownProps & BoxProps
> = styled(Box)<BoxProps & StyledCardDropdownProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  popoverPaper: {
    border: `1px solid ${theme.palette.grey[100]}`,
    marginTop: theme.spacing(0.5),
  },
}));
