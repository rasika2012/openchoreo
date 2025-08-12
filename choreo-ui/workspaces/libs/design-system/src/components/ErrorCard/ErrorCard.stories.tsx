import type { Meta, StoryObj } from '@storybook/react';
import { ErrorCard } from './ErrorCard';
import { Box } from '@mui/material';
import { ErrorCodeMessage } from './ErrorCodeMessage/ErrorCodeMessage';
import UnauthorizedAccessImg from '@design-system/Images/generated/Unauthorized';
import SessionTimeoutImg from '@design-system/Images/generated/SessionTimeout';
import { Button } from '../Button';
import NoRepository from '@design-system/Images/generated/NoRepository';
import InfoListItem from './InfoListItem';
import {
  ImageAuthenticationError,
  ImageOppsEmbarrassing,
  ImageUnableToObserve,
} from '@design-system/Images';
import { Link } from '../Link';

const meta: Meta<typeof ErrorCard> = {
  title: 'ErrorComponents/ErrorCard',
  component: ErrorCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ErrorCard>;

export const AuthenticationError: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Authentication Error"
        image={<ImageAuthenticationError />}
        description="Something went wrong during the authentication process.
      Please try signing in again."
        testId="authentication-error"
      />
    </Box>
  ),
};

export const Unauthorized: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Unauthorized access page"
        image={<UnauthorizedAccessImg />}
        description="Something went terribly wrong. Will you please refresh and try again."
        testId="unauthorized"
      >
        <ErrorCodeMessage
          code="500"
          message="Internal Server Error"
          testId="unauthorized-code"
        />
      </ErrorCard>
    </Box>
  ),
};

export const SessionTimedOut: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Oops! Session timed out"
        image={<SessionTimeoutImg />}
        actions={<Button testId="login-button">Login</Button>}
        description="Click Login to continue again"
        testId="session-timeout"
      />
    </Box>
  ),
};

export const RepositoryNotAccessible: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Repository is no longer accessible"
        image={<NoRepository />}
        actions={
          <Button testId="back-to-list-button">
            Back to Component Listing
          </Button>
        }
        testId="repo-not-accessible"
        description="It seems like your GitHub repository COVID-19 Statistics to Email is no
      longer accessible to Choreo"
      >
        <Box display="flex" flexDirection="column">
          <InfoListItem
            message="If you have removed the Choreo GitHub app from the above repository, 
                add it back and proceed to work with the component"
          />

          <InfoListItem
            message="If you have deleted the repository, you must delete the component 
            and recreate it using another repository"
          />
        </Box>
      </ErrorCard>
    </Box>
  ),
};

export const OppsEmbarrassing: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Repository is no longer accessible"
        image={<ImageOppsEmbarrassing />}
        description="Something went wrong! Refresh and try again"
        testId="oops-embarrassing"
      >
        <ErrorCodeMessage
          code="500"
          message="Internal Server Error"
          testId="oops-embarrassing-code"
        />
      </ErrorCard>
    </Box>
  ),
};

export const UnableToObserve: Story = {
  args: {},
  render: (_args) => (
    <Box>
      <ErrorCard
        title="Unable to observe the component"
        image={<ImageUnableToObserve />}
        description={
          <>
            No policies attached. Add{' '}
            <Link href="#" testId="policies">
              policies
            </Link>{' '}
            to continue.
          </>
        }
        testId="unavailable"
      />
    </Box>
  ),
};
