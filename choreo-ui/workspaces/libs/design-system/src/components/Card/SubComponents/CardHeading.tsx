import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Button } from '../../Button';

const StyledCardHeading = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface CardHeadingProps {
  title: React.ReactNode | string;
  onClose?: () => void;
  testId: string;
  size?: 'small' | 'medium' | 'large';
}

export function CardHeading(props: CardHeadingProps) {
  const { title, onClose, testId, size = 'medium' } = props;

  return (
    <StyledCardHeading data-cyid={`${testId}-card-heading`}>
      <Box flexGrow={1}>
        <Typography
          variant={size === 'small' ? 'h3' : size === 'medium' ? 'h2' : 'h1'}
        >
          {title}
        </Typography>
      </Box>
      {onClose && (
        <Button
          color="secondary"
          variant="text"
          onClick={onClose}
          testId="btn-close"
        >
          Close
        </Button>
      )}
    </StyledCardHeading>
  );
}
