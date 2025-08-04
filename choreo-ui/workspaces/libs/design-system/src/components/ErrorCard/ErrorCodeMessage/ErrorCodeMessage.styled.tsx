import { Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledErrorCodeMessageProps extends BoxProps {
  disabled?: boolean;
}

export const StyledErrorCodeMessage: ComponentType<StyledErrorCodeMessageProps> =
  styled(Box)<StyledErrorCodeMessageProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    '&.errorCodeIcon': {
      color: theme.palette.error.main,
      marginRight: theme.spacing(1),
    },
    '&.errorCodeTypo': {
      display: 'flex',
      alignItems: 'center',
    },
    '&.errorCode': {
      color: theme.palette.error.main,
      marginRight: theme.spacing(0.5),
    },
    '&.errorMessage': {
      color: theme.palette.error.main,
    },
  }));
