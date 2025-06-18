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
  '.divider': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  '.buttonLink': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginTop: theme.spacing(1.5),
    textDecoration: 'none',
  },
  '.dividerDark': {
    backgroundColor: theme.palette.grey[100],
  },
  '.exampleContent': {
    fontWeight: 100,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  '.exampleContentDark': {
    color: theme.palette.grey[100],
  },
  '.exampleContentLight': {
    color: theme.palette.secondary.dark,
  },
}));
