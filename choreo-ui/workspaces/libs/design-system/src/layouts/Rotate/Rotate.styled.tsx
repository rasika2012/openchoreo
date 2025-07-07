import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledRotateProps {
  disabled?: boolean;
}

export const StyledRotate: ComponentType<StyledRotateProps & BoxProps> = styled(Box)<BoxProps & StyledRotateProps>(({ disabled }) => ({
  animation: disabled ? 'none' : 'spin 1s linear infinite',
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  placeItems: 'center',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

