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
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(1.75),
  boxShadow: 'none',
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[100]}`,
  color: theme.palette.text.primary,
  justifyContent: 'flex-start',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey[200],
  },

  '& .popoverPaper': {
    border: `1px solid ${theme.palette.grey[100]}`,
    marginTop: theme.spacing(0.5),
    borderRadius: 8,
  },

  '&[data-button-root-active="true"]': {
    borderColor: theme.palette.primary.light,
    boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 1px ${theme.palette.primary.light}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  },

  '&[data-button-root-full-height="true"]': {
    height: '100%',
  },
  '&[data-card-dropdown-size="small"]': {
    padding: theme.spacing(1.25),
    '& .startIcon': {
      width: theme.spacing(4),
      height: theme.spacing(4),
      minWidth: theme.spacing(4),
      minHeight: theme.spacing(4),
    },
  },

  '&[data-card-dropdown-size="medium"]': {
    padding: theme.spacing(1.5),
    '& .startIcon': {
      width: theme.spacing(5),
      height: theme.spacing(5),
      minWidth: theme.spacing(5),
      minHeight: theme.spacing(5),
    },
  },

  '&[data-card-dropdown-size="large"]': {
    minHeight: theme.spacing(5.5),
    '& .startIcon': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      minWidth: theme.spacing(6),
      minHeight: theme.spacing(6),
    },
  },
  '& > Box:nth-of-type(2)': {
    fontWeight: 600,
    lineHeight: `${theme.spacing(3)}px`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  '& .endIcon': {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignItems: 'center',
    fontSize: theme.spacing(1.5),
  },
  '& .startIcon': {
    margin: 0,
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    '& > *': {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
    },
  },
  '& .MuiPopover-paper': {
    marginTop: theme.spacing(0.5),
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[100]}`,
  },
  '& .MuiMenuItem-root': {
    lineHeight: `${theme.spacing(3)}px`,
    padding: theme.spacing(1, 2),
    '&:focus, &:hover, &.Mui-selected': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
