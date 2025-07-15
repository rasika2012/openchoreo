import React from 'react';
import { Skeleton as MuiSkeleton, SxProps, Theme } from '@mui/material';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Skeleton component
 * @component
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ children, isLoading = false, ...props }, ref) => {
    if (isLoading) {
      return (
        <MuiSkeleton
          ref={ref}
          {...props}
        >
          {children}
        </MuiSkeleton>
      );
    }
    return <>{children}</>;
  }
);

Skeleton.displayName = 'Skeleton';
