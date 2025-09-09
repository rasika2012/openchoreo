import type { ComponentBinding } from '@open-choreo/definitions';
import type { Meta, StoryObj } from '@storybook/react';
import { EnvDeploymentContent } from './EnvDeploymentContent';

const sampleBinding: ComponentBinding = {
  name: 'greeting-service-production',
  type: 'Service',
  componentName: 'greeting-service',
  projectName: 'default',
  orgName: 'default',
  environment: 'production',
  status: {
    reason: 'ResourcesActive',
    message: 'All 5 resources are deployed and healthy',
    status: 'Active',
    lastTransitioned: '2025-09-02T05:11:51Z',
  },
  webApplicationBinding: {
    endpoints: [
      {
        name: 'greeter-api',
        type: 'REST',
        project: {
          host: 'greeting-service-production-1668686d',
          port: 9090,
          scheme: 'http',
          uri: 'http://greeting-service-production-1668686d:9090',
        },
        public: {
          host: 'production.choreoapis.localhost',
          port: 8443,
          scheme: 'https',
          basePath: '/default/greeting-service/greeter',
          uri: 'https://production.choreoapis.localhost:8443/default/greeting-service/greeter',
        },
      },
    ],
    image: 'localhost:30003/default-greeting-service:default-8ecbb654',
  },
};
const meta: Meta<typeof EnvDeploymentContent> = {
  title: 'Choreo Views/EnvDeploymentContent',
  component: EnvDeploymentContent,
  parameters: {
    docs: {
      description: {
        component:
          'A simple card component that displays environment deployment content with static content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EnvDeploymentContent>;

export const Default: Story = {
  args: {
    binding: sampleBinding,
  },
};
