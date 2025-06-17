import { styled, Tooltip, TooltipProps } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledTooltipProps extends TooltipProps {
  disabled?: boolean;
}

export const StyledTooltip: ComponentType<StyledTooltipProps> = styled(
  Tooltip,
  {
    shouldForwardProp: (prop) => !['disabled'].includes(prop as string),
  }
)<StyledTooltipProps>(({ disabled, theme }) => ({
  pointerEvents: disabled ? 'none' : 'auto',
  cursor: disabled ? 'default' : 'pointer',
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
}));
