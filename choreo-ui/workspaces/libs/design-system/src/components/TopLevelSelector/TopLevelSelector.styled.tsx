import { alpha, Card, CardProps, Popover, PopoverProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledTopLevelSelectorProps {
  disabled?: boolean;
  isHighlighted?: boolean;
}

export const StyledTopLevelSelector: ComponentType<StyledTopLevelSelectorProps & CardProps> = styled(Card)<CardProps & StyledTopLevelSelectorProps>(({ disabled, theme, isHighlighted }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  pointerEvents: disabled ? 'none' : 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  backgroundColor: isHighlighted ? alpha(theme.palette.primary.light, 0.1) : 'transparent',
  borderColor: isHighlighted ? theme.palette.primary.main : theme.palette.divider,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiCardHeader-root': {
    padding: theme.spacing(1),
  },

  padding: theme.spacing(1),

}));

export const StyledPopover: ComponentType<PopoverProps> = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    boxShadow: theme.shadows[1],
    width: theme.spacing(40),
  },
}));