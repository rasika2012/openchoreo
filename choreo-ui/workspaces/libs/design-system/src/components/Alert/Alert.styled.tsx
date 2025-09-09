import { ComponentType } from 'react';
import { Alert, AlertProps, styled } from '@mui/material';

export interface StyledAlertProps {
  disabled?: boolean;
}

export const StyledAlert: ComponentType<StyledAlertProps & AlertProps> = styled(
  Alert
)<AlertProps & StyledAlertProps>(({ disabled }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background-color 0.3s ease',
}));
