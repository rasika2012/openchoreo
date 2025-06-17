import React from 'react';
import {
  CardActionArea as MuiCardActionArea,
  styled,
  SxProps,
  Theme,
} from '@mui/material';

interface CardActionAreaProps {
  children: React.ReactNode;
  variant?: 'elevation' | 'outlined';
  testId: string;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledCardActionArea = styled(MuiCardActionArea, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'fullHeight',
})<{ variant?: 'elevation' | 'outlined'; fullHeight?: boolean }>(
  ({ theme, variant = 'elevation', fullHeight = false }) => ({
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    ...(variant === 'outlined' && {
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        borderColor: theme.palette.action.hover,
      },
    }),
    ...(variant === 'elevation' && {
      boxShadow: theme.shadows[1],
      '&:hover': {
        boxShadow: theme.shadows[2],
      },
    }),
    ...(fullHeight && {
      height: '100%',
    }),
  })
);

export const CardActionArea = ({
  children,
  variant = 'elevation',
  testId,
  fullHeight = false,
  sx,
  ...rest
}: CardActionAreaProps) => (
  <StyledCardActionArea
    variant={variant}
    fullHeight={fullHeight}
    data-cyid={`${testId}-card-action-area`}
    disableRipple
    sx={sx}
    {...rest}
  >
    {children}
  </StyledCardActionArea>
);
