import {
  Box,
  Button,
  ButtonContainer,
  Card,
  CardContent,
  Divider,
  IconButton,
  RefreshIcon,
  ReloadIcon,
  Rotate,
  StopIcon,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';
import { FormattedMessage } from 'react-intl';

export interface EnvCardBaseProps {
  envName: string;
  isRefetching?: boolean;
  isLoading?: boolean;
  status?: string;
  onRefresh?: () => void;
  onRedeploy?: () => void;
  onStop?: () => void;
  children?: React.ReactNode;
}

export function EnvCardBase(props: EnvCardBaseProps) {
  const {
    envName,
    isRefetching,
    isLoading,
    status,
    onRefresh,
    onRedeploy,
    onStop,
    children,
  } = props;
  const theme = useChoreoTheme();

  return (
    <Card testId="envcardbase">
      <Box
        padding={theme.spacing(2, 3)}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{envName}</Typography>
        <ButtonContainer testId="envcardbase-actions">
          {onStop && (
            <Button
              disabled={status?.endsWith('ing')}
              onClick={onStop}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<StopIcon />}
            >
              <FormattedMessage
                id="views.envcardbase.stop"
                defaultMessage="Stop"
              />
            </Button>
          )}
          {onRedeploy && (
            <Button
              disabled={status?.endsWith('ing')}
              onClick={onRedeploy}
              variant="outlined"
              startIcon={
                <Rotate disabled={!status?.endsWith('ing')}>
                  <ReloadIcon fontSize="inherit" />
                </Rotate>
              }
              color="success"
              size="small"
            >
              <FormattedMessage
                id="views.envcardbase.redeploy"
                defaultMessage="Redeploy"
              />
            </Button>
          )}
          {onRefresh && (
            <IconButton
              disabled={isRefetching || status?.endsWith('ing')}
              onClick={onRefresh}
              variant="square"
              testId="envcardbase-refresh"
              color="primary"
              size="small"
            >
              <Rotate disabled={!isRefetching || status?.endsWith('ing')}>
                <RefreshIcon fontSize="inherit" />
              </Rotate>
            </IconButton>
          )}
        </ButtonContainer>
      </Box>
      <Divider />

      <CardContent>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            padding={theme.spacing(2)}
            alignItems="center"
            height="100%"
          >
            <Rotate disabled={!isLoading}>
              <ReloadIcon />
            </Rotate>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            padding={theme.spacing(2)}
            alignItems="center"
            height="100%"
          >
            {children}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
