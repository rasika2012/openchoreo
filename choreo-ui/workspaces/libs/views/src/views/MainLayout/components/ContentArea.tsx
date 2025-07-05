import { useChoreoTheme, useMediaQuery, Box } from '@open-choreo/design-system';
import React from 'react';

export interface ContentAreaProps {
  children?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const ContentArea = React.forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ children, rightSidebar }, ref) => {
    const theme = useChoreoTheme();
    const isMobile = useMediaQuery('md', 'down');

    return (
      <Box
        ref={ref}
        flexGrow={1}
        flexDirection="row"
        display="flex"
        overflow="auto"
      >
        <Box flexGrow={1} height="100%" overflow="auto">
          {children}
        </Box>
        {!isMobile && rightSidebar && (
          <Box
            height="100%"
            minWidth={theme.spacing(30)}
            maxWidth={theme.spacing(40)}
            borderLeft="small"
            borderColor={theme.pallet.grey[200]}
          >
            {rightSidebar}
          </Box>
        )}
      </Box>
    );
  }
);

ContentArea.displayName = 'ContentArea';
