import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Choreo DS/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
      description: 'The type of content that will be rendered',
      table: {
        type: { summary: 'text | rectangular | circular' },
        defaultValue: { summary: 'text' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
      table: {
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
      table: {
        type: { summary: 'string | number' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'The animation effect',
      table: {
        type: { summary: 'pulse | wave | false' },
        defaultValue: { summary: 'pulse' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether to show skeleton or content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    children: 'This is the actual content',
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    children: 'This content is loading...',
    isLoading: true,
    variant: 'text',
  },
};

export const TextVariant: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isLoading: true,
    variant: 'text',
  },
};

export const RectangularVariant: Story = {
  args: {
    children: <Box sx={{ width: 300, height: 150, bgcolor: 'primary.main' }}>Content Block</Box>,
    isLoading: true,
    variant: 'rectangular',
    width: 300,
    height: 150,
  },
};

export const CircularVariant: Story = {
  args: {
    children: <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'secondary.main' }}>Avatar</Box>,
    isLoading: true,
    variant: 'circular',
    width: 80,
    height: 80,
  },
};

export const WaveAnimation: Story = {
  args: {
    children: 'Content with wave animation',
    isLoading: true,
    variant: 'text',
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    children: 'Content with no animation',
    isLoading: true,
    variant: 'text',
    animation: false,
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Custom sized content',
    isLoading: true,
    variant: 'rectangular',
    width: '100%',
    height: 60,
  },
};
