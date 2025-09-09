import React from 'react';
import {
  CircularProgress,
  Box,
  Typography,
  CircularProgressProps,
} from '@mui/material';

export interface CircularLoaderProps {
  /** Size of the circular loader */
  size?: number | string;
  /** Text to display below the loader */
  text?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional CircularProgress props */
  CircularProgressProps?: Partial<CircularProgressProps>;
}

/**
 * CircularLoader component - A loading spinner with optional text
 * @component
 */
export const CircularLoader = React.forwardRef<
  HTMLDivElement,
  CircularLoaderProps
>(
  (
    {
      size = 40,
      text,
      className,
      CircularProgressProps: circularProgressProps,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        className={className}
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        gap={text ? 2 : 0}
        {...props}
      >
        <CircularProgress size={size} {...circularProgressProps} />
        {text && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {text}
          </Typography>
        )}
      </Box>
    );
  }
);

CircularLoader.displayName = 'CircularLoader';
