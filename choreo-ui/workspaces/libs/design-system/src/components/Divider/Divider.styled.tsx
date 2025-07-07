import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledDividerProps {
  disabled?: boolean;
}

export const StyledDivider: ComponentType<StyledDividerProps & BoxProps> = styled(Box)<BoxProps & StyledDividerProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

