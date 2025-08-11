import React from 'react';
import { StyledErrorCard } from './ErrorCard.styled';
import { Box, Typography } from '@mui/material';

export interface ErrorCardProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  testId: string;
}

/**
 * ErrorCard component
 * @component
 */
export const ErrorCard = React.forwardRef<HTMLDivElement, ErrorCardProps>(
  (
    {
      title,
      description,
      image,
      actions,
      children,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <StyledErrorCard
        ref={ref}
        className="errorCard"
        data-cyid={`${testId}-error-card`}
      >
        <Box className="errorCardContent">
          {image && <Box className="errorCardImage">{image}</Box>}
          {title && (
            <Box className="errorCardTitle">
              <Typography variant="h2">{title}</Typography>
            </Box>
          )}
          {description && (
            <Box className="errorCardDescription">
              <Typography variant="body1" color="secondary">
                {description}
              </Typography>
            </Box>
          )}
          {children && <Box className="errorCardChildren">{children}</Box>}
          {actions && <Box className="errorCardAction">{actions}</Box>}
        </Box>
      </StyledErrorCard>
    );
  }
);

ErrorCard.displayName = 'ErrorCard';

export default ErrorCard;
