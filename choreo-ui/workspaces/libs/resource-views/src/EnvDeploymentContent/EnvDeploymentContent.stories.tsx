import type { Meta, StoryObj } from '@storybook/react';
import { EnvDeploymentContent } from './EnvDeploymentContent';

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

export const Default: Story = {};
