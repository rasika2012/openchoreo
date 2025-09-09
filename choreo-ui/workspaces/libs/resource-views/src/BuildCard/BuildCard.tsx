import { useMemo } from 'react';
import { Build } from '@open-choreo/definitions';
import {
  Box,
  Card,
  CommitIcon,
  TimeIcon,
  Typography,
  useChoreoTheme,
  Chip,
  CircularLoader,
} from '@open-choreo/design-system';
import dayjs from 'dayjs';

interface BuildCardProps {
  build: Build;
  onClick: () => void;
  isSelected: boolean;
}

export function BuildCard(props: BuildCardProps) {
  const { build, onClick, isSelected } = props;
  const { uuid, commit, createdAt, status, name } = build;
  const theme = useChoreoTheme();
  const statusColor = useMemo(() => {
    switch (status) {
      case 'completed':
        return (
          <Chip
            testId="buildcard-status-completed"
            label="Completed"
            size="small"
            variant="outlined"
            color="success"
          />
        );
      case 'failed':
        return (
          <Chip
            testId="buildcard-status-failed"
            label="Failed"
            size="small"
            variant="outlined"
            color="error"
          />
        );
      default:
        return <CircularLoader size={12} />;
    }
  }, [status]);
  return (
    <Card
      testId="buildcard"
      variant={isSelected ? 'outlined' : 'elevation'}
      bgColor={isSelected ? 'secondary' : 'default'}
      onClick={onClick}
    >
      <Box padding={theme.spacing(1)}>
        <Box
          color="text.secondary"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={theme.spacing(1)}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1}
          >
            <Typography color="text.primary" variant="caption" noWrap>
              <Typography
                component="span"
                variant="overline"
                color="text.primary"
              >
                {name ?? uuid}
              </Typography>
              <Typography
                component="span"
                variant="overline"
                color="text.secondary"
              >
                {' '}
                {statusColor}
              </Typography>
            </Typography>
            <Box display="flex" alignItems="center" gap={4}>
              <TimeIcon fontSize="inherit" color="inherit" />
              <Typography color="text.primary">
                {dayjs(createdAt).fromNow?.()}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1}
          >
            <Typography color="text.secondary" variant="body2">
              Commit Details
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={4}
              color="text.primary"
            >
              <CommitIcon fontSize="inherit" color="inherit" />
              <Typography color="text.primary">{commit}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
