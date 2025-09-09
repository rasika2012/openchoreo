import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Choreo DS/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: {
        type: 'select',
      },
      options: ['error', 'warning', 'info', 'success'],
      description: 'Visual severity that controls the color',
      table: {
        type: { summary: '"error" | "warning" | "info" | "success"' },
      },
    },
    status: {
      control: 'text',
      description: 'Text describing the current status',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Optional icon element rendered before the text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    severity: 'info',
    status: 'In Progress',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    status: 'Failed',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    status: 'Degraded',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    status: 'Healthy',
  },
};
