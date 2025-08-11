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
    color: theme.palette.error.main,
    justifyContent: 'center',
    gap: theme.spacing(1),

    '& .errorCodeIcon': {
      color: theme.palette.error.main,
      marginRight: theme.spacing(1),
    },
    '& .errorCodeMessage': {
      display: 'flex !important',
      alignItems: 'center',
      flexDirection: 'row !important',
    },
    '& .errorCode': {
      color: theme.palette.error.main,
      marginRight: theme.spacing(0.5),
    },
    '& .errorMessage': {
      color: theme.palette.error.main,
    },
  }));
