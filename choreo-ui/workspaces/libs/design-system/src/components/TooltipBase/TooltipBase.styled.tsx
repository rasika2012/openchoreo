import { styled, Tooltip, TooltipProps } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledTooltipBaseProps extends TooltipProps {
  disabled?: boolean;
}

export const StyledTooltipBase: ComponentType<StyledTooltipBaseProps> = styled(
  Tooltip,
  { shouldForwardProp: (prop) => !['disabled'].includes(prop as string) }
)<StyledTooltipBaseProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  pointerEvents: disabled ? 'none' : 'auto',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
