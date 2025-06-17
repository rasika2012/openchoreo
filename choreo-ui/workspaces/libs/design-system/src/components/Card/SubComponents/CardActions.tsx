import React from 'react';
import {
  CardActions as MuiCardActions,
  styled,
  SxProps,
  Theme,
} from '@mui/material';

interface CardActionsProps {
  children: React.ReactNode;
  testId: string;
  sx?: SxProps<Theme>;
}

const StyledCardActions = styled(MuiCardActions)(({ theme }) => ({
  padding: theme.spacing(1),
  '&:last-child': {
    paddingBottom: theme.spacing(1),
  },
}));

export const CardActions = ({
  children,
  testId,
  sx,
  ...rest
}: CardActionsProps) => (
  <StyledCardActions data-cyid={`${testId}-card-actions`} sx={sx} {...rest}>
    {children}
  </StyledCardActions>
);
