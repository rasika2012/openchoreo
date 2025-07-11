import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Button } from '../../Button';
import { CloseIcon } from '@design-system/Icons';

const StyledCardHeading = styled(Box)<{ isForm?: boolean }>(
  ({ theme, isForm }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: theme.spacing(2),
    padding: theme.spacing(5, 5, 0, 5),
    borderBottom: isForm ? `1px solid ${theme.palette.divider}` : 'none',
    '& .btn-close': {
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  })
);

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
          className="btn-close"
          onClick={onClose}
          testId="btn-close"
          endIcon={<CloseIcon />}
        >
          Close
        </Button>
      )}
    </StyledCardHeading>
  );
}
