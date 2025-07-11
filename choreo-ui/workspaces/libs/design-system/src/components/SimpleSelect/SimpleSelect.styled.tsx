import { alpha, Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledSimpleSelectProps extends BoxProps {
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export const StyledSimpleSelect: ComponentType<StyledSimpleSelectProps> =
  styled(Box)<StyledSimpleSelectProps>(({ disabled, size, theme }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: 'transparent',

    '& .MuiSelect-select': {
      padding: size === 'small' ? theme.spacing(1, 1.5) : theme.spacing(1.5, 2),
      fontSize:
        size === 'small'
          ? theme.typography.body2.fontSize
          : theme.typography.body1.fontSize,
    },
    '& .MuiInputBase-root': {
      backgroundColor:
        'dark' in theme.palette
          ? theme.palette.background.default
          : 'transparent',
      minHeight: size === 'small' ? '32px' : '40px',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.divider}`,
      outline: 'none',

      '&:hover': {
        outline: 'none',
        border: 'none',
      },
      '&:focus': {
        outline: 'none',
        border: 'none',
      },
    },

    '& .Mui-focused': {
      boxShadow: `0 -3px 9px 0 ${alpha(theme.palette.common.black, 0.04)}`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },

    '& .MuiSelect-icon': {
      fontSize: size === 'small' ? '0.6rem' : '0.8rem',
    },

    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
    },
    '.loadingIcon': {
      marginRight: theme.spacing(1.5),
    },
  }));
