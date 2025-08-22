import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { CircularLoader } from './CircularLoader';

const meta: Meta<typeof CircularLoader> = {
  title: 'Choreo DS/CircularLoader',
  component: CircularLoader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the circular loader',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '40' },
      },
    },
    text: {
      control: 'text',
      description: 'Text to display below the loader',
      table: {
        type: { summary: 'string' },
      },
    },
    CircularProgressProps: {
      control: 'object',
      description: 'Additional props for the CircularProgress component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularLoader>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: 'Loading...',
  },
};

export const CustomSize: Story = {
  args: {
    size: 60,
    text: 'Loading data',
  },
};

export const SmallLoader: Story = {
  args: {
    size: 24,
    text: 'Please wait',
  },
};

export const LargeLoader: Story = {
  args: {
    size: 80,
    text: 'Processing your request',
  },
};

export const DifferentColors: Story = {
  render: () => (
    <Box display="flex" gap={4} alignItems="center">
      <CircularLoader 
        text="Primary" 
        CircularProgressProps={{ color: 'primary' }} 
      />
      <CircularLoader 
        text="Secondary" 
        CircularProgressProps={{ color: 'secondary' }} 
      />
      <CircularLoader 
        text="Success" 
        CircularProgressProps={{ color: 'success' }} 
      />
      <CircularLoader 
        text="Warning" 
        CircularProgressProps={{ color: 'warning' }} 
      />
      <CircularLoader 
        text="Error" 
        CircularProgressProps={{ color: 'error' }} 
      />
    </Box>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <Box display="flex" gap={4} alignItems="center">
      <CircularLoader size={20} text="Small" />
      <CircularLoader size={40} text="Medium" />
      <CircularLoader size={60} text="Large" />
      <CircularLoader size={80} text="Extra Large" />
    </Box>
  ),
};

export const WithLongText: Story = {
  args: {
    size: 50,
    text: 'Loading your data, this might take a few moments...',
  },
};
