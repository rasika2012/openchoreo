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
  '.infoTooltipDark': {
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 5,
  },
  '.infoArrowDark': {
    color: theme.palette.secondary.dark,
  },
  '.infoTooltipLight': {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    maxWidth: theme.spacing(53),
  },
  '.infoArrowLight': {
    color: theme.palette.common.white,
  },
}));
