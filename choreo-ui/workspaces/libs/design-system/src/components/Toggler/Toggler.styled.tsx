import { Switch, SwitchProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export type colorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type sizeVariant = 'small' | 'medium';

export interface StyledTogglerProps extends SwitchProps {
  disabled?: boolean;
  size?: sizeVariant;
  color?: colorVariant;
}

export const StyledToggler: ComponentType<StyledTogglerProps> = styled(
  Switch
)<StyledTogglerProps>(({
  disabled,
  theme,
  size = 'medium',
  color = 'primary',
}) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
      default:
        return theme.palette.success.main;
    }
  };

  return {
    padding: theme.spacing(0.1),
    margin: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: size === 'small' ? theme.spacing(3.5) : theme.spacing(5.5),
    height: size === 'small' ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,

    '& .MuiSwitch-switchBase': {
      padding: theme.spacing(0.25),
      margin: 0,

      '&.Mui-disabled': {
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.grey[100],
          border: `1px solid ${theme.palette.grey[200]}`,
          opacity: 1,
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.grey[300],
        },
        '&.Mui-checked': {
          '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.grey[400],
          },
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.grey[200],
            border: `1px solid ${theme.palette.grey[300]}`,
            opacity: 1,
          },
        },
      },
      '&.Mui-checked': {
        transform: size === 'small' ? 'translateX(12px)' : 'translateX(20px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: getColor(),
          border: `1px solid ${getColor()}`,
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.common.white,
        },
      },
    },

    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[200],
      width: size === 'small' ? theme.spacing(1.5) : theme.spacing(2.5),
      height: size === 'small' ? theme.spacing(1.5) : theme.spacing(2.5),
      borderRadius:
        size === 'small' ? theme.spacing(0.75) : theme.spacing(1.25),
    },

    '& .MuiSwitch-track': {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: size === 'small' ? theme.spacing(1) : theme.spacing(1.5),
      backgroundColor: theme.palette.common.white,
      opacity: 1,
    },
  };
});
