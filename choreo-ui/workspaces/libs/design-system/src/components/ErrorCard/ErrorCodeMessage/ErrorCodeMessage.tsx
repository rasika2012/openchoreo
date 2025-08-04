import Error from '@design-system/Icons/generated/Error';
import { Box, Typography } from '@mui/material';
import { StyledErrorCodeMessage } from './ErrorCodeMessage.styled';

interface ErrorCodeMessageProps {
  code?: string;
  message?: string;
  testId: string;
}

export const ErrorCodeMessage: React.FC<ErrorCodeMessageProps> = ({
  code,
  message,
  testId,
}) => {
  return (
    <StyledErrorCodeMessage
      className="errorCodeMessage"
      data-cyid={`${testId}-error-code-message`}
    >
      <Box className="errorCodeIcon">
        <Error fontSize="small" />
      </Box>
      <Typography variant="body1">
        <Box className="errorCodeTypo">
          {code && <Box className="errorCode">{code}</Box>}
          {message && <Box className="errorMessage">{message}</Box>}
        </Box>
      </Typography>
    </StyledErrorCodeMessage>
  );
};

export default ErrorCodeMessage;
