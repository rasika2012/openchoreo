import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';

export interface SidePanelProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Whether the drawer is open */
  open: boolean;
  /** Handler for closing the drawer */
  onClose: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Width of the drawer */
  width?: number | string;
  /** Whether to show backdrop */
  hideBackdrop?: boolean;
  /** Additional Drawer props */
  DrawerProps?: Partial<
    Omit<DrawerProps, 'open' | 'onClose' | 'anchor' | 'children'>
  >;
}

/**
 * SidePanel component - A right-side drawer component
 * @component
 */
export const SidePanel = React.forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      children,
      open,
      onClose,
      className,
      width = 400,
      hideBackdrop = false,
      DrawerProps: drawerProps,
      ...props
    },
    ref
  ) => {
    return (
      <Drawer
        ref={ref}
        anchor="right"
        open={open}
        onClose={onClose}
        hideBackdrop={hideBackdrop}
        className={className}
        PaperProps={{
          sx: {
            width: width,
            maxWidth: '90vw',
          },
        }}
        {...drawerProps}
        {...props}
      >
        {children}
      </Drawer>
    );
  }
);

SidePanel.displayName = 'SidePanel';
