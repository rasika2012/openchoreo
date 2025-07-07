import { Box, Button, ButtonContainer, Card, CardContent, Divider, Typography, useChoreoTheme } from '@open-choreo/design-system';
import { FormattedMessage } from 'react-intl';

export interface EnvCardBaseProps {
  envName: string;
  onRefresh?: () => void;
  onRedeploy?: () => void;
  onStop?: () => void;
}

export function EnvCardBase(props: EnvCardBaseProps) {
  const { envName, onRefresh, onRedeploy, onStop } = props;
  const theme = useChoreoTheme();

  return (
    <Card testId="envcardbase">
      <Box padding={theme.spacing(2, 3)} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{envName}</Typography>
        <ButtonContainer testId="envcardbase-actions">
          <Button onClick={onStop}  variant="outlined" color="error" size="small">
            <FormattedMessage id="views.envcardbase.stop" defaultMessage="Stop" />
          </Button>
          <Button onClick={onRedeploy}  variant="outlined" color="success" size="small">
            <FormattedMessage id="views.envcardbase.redeploy" defaultMessage="Redeploy" />
          </Button>
          <Button onClick={onRefresh} variant="outlined" color="primary" size="small">
            <FormattedMessage id="views.envcardbase.refresh" defaultMessage="Refresh" />
          </Button>
        </ButtonContainer>
  
      </Box>
      <Divider />
      <CardContent>EnvCardBase Card Content</CardContent>
    </Card>
  );
}
