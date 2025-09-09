import React from 'react';
import { alpha, Box, Typography, useTheme } from '@mui/material';

export interface StatusProps {
  /** The severity of the status */
  severity: 'error' | 'warning' | 'info' | 'success';
  /** The icon to be rendered within the component */
  icon?: React.ReactNode;
  /** Whether the component is disabled */
  status?: string;
  /** Title variant */
  title?: string;
}

/**
 * Status component
 * @component
 */
export const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ severity, icon, status = 'Unknown', title }) => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          backgroundColor: alpha(
            severity === 'error'
              ? theme.palette.error.main
              : severity === 'warning'
                ? theme.palette.warning.main
                : severity === 'info'
                  ? theme.palette.info.main
                  : theme.palette.success.main,
            0.1
          ),
          borderRadius: 1,
          padding: theme.spacing(1.5, 2),
          color:
            severity === 'error'
              ? theme.palette.error.main
              : severity === 'warning'
                ? theme.palette.warning.main
                : severity === 'info'
                  ? theme.palette.info.main
                  : theme.palette.success.main,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="body1" color="text.primary" fontWeight="600">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2">{status}</Typography>
      </Box>
    );
  }
);

Status.displayName = 'Status';
