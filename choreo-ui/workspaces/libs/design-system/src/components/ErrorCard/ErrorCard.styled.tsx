import { Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledErrorCardProps {
  disabled?: boolean;
}

export const StyledErrorCard: ComponentType<StyledErrorCardProps & BoxProps> =
  styled(Box)<BoxProps & StyledErrorCardProps>(({ theme }) => ({
    '& .errorCard': {
      textAlign: 'center',
      width: '100%',
      margin: 'auto',
    },
    '& .errorCardContent': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& .errorCardImage': {
      marginBottom: theme.spacing(1),
      maxWidth: theme.spacing(35),
      '& svg,& img': {
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
      },
    },
    '& .errorCardTitle': {
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    '& .errorCardDescription': {
      marginTop: theme.spacing(1),
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    '& .errorCardChildren': {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
    },
    '& .errorCardAction': {
      marginTop: theme.spacing(2),
    },

    '& .infoListItem': {
      display: 'flex',
      alignItems: 'flex-start',
      textAlign: 'left',
      marginBottom: theme.spacing(1),
    },
    '& .infoListItemIcon': {
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(0.6),
    },
    '& .infoListItemMessage': {},
  }));
