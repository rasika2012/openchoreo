import { Button, ButtonProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledCardButtonProps extends ButtonProps {
  disabled?: boolean;
}

export const StyledCardButton: ComponentType<StyledCardButtonProps> = styled(
  Button
)<StyledCardButtonProps>(({ theme }) => ({
  padding: theme.spacing(1.75),
  backgroundColor: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[100]}`,
  color: theme.palette.text.primary,
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey[200],
  },
  '&[data-button-root-active="true"]': {
    borderColor: theme.palette.primary.light,
    boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
    backgroundColor: 'inherit', // had backgroundColor: theme.custom.indigo[100],
    '&:hover': {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
      backgroundColor: 'inherit', // had backgroundColor: theme.custom.indigo[100],
    },
  },
  '&[data-button-root-error="true"]': {
    borderColor: theme.palette.error.main,
    boxShadow: `0 0 0 1px ${theme.palette.error.light}`,
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 1px ${theme.palette.error.main}`,
      backgroundColor: theme.palette.error.light,
    },
  },
  '&[data-button-root-full-height="true"]': {
    height: '100%',
  },
  '&.Mui-buttonEndIcon': {
    marginLeft: 'auto',
    marginRight: 0,
    '&.MuiButton-iconSizeSmall > *:first-child': {
      fontSize: theme.spacing(1.5),
    },
    '&.MuiButton-iconSizeMedium > *:first-child': {
      fontSize: theme.spacing(1.5),
    },
    '&.MuiButton-iconSizeLarge > *:first-child': {
      fontSize: theme.spacing(1.5),
    },
  },
  '&.Mui-buttonStartIcon': {
    '&.MuiButton-iconSizeSmall > *:first-child': {
      fontSize: theme.spacing(3),
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    '&.MuiButton-iconSizeMedium > *:first-child': {
      fontSize: theme.spacing(4),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    '&.MuiButton-iconSizeLarge > *:first-child': {
      fontSize: theme.spacing(5),
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  '&.Mui-buttonLabel': {
    lineHeight: `${theme.spacing(3)}px`,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gridGap: theme.spacing(2),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& $buttonStartIcon': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  '&[data-button-label-size="small"]': {},
  '&[data-button-label-size="medium"]': {},
  '&[data-button-label-size="large"]': {
    minHeight: theme.spacing(5.5),
  },
  '& .buttonLabelText': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  '& .endIcon': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  '&$disabled': {
    boxShadow: 'none',
    pointerEvents: 'none',
  },
}));
