import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { SidePanel } from './SidePanel';

const meta: Meta<typeof SidePanel> = {
  title: 'Choreo DS/SidePanel',
  component: SidePanel,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the drawer',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '400' },
      },
    },
    hideBackdrop: {
      control: 'boolean',
      description: 'Whether to hide the backdrop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Handler for closing the drawer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

// Template component for stories with state management
const SidePanelTemplate = ({ children, ...args }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Side Panel
      </Button>
      <SidePanel
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </SidePanel>
    </>
  );
};

export const Default: Story = {
  render: (args) => <SidePanelTemplate {...args} />,
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Side Panel Content
        </Typography>
        <Typography variant="body1">
          This is the default side panel. It slides in from the right side of the screen.
        </Typography>
      </Box>
    ),
  },
};

export const WithCloseButton: Story = {
  render: (args) => <SidePanelTemplate {...args} />,
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Side Panel with Close Button
          </Typography>
          <IconButton onClick={() => {}} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">
          This side panel includes a close button in the header for better UX.
        </Typography>
      </Box>
    ),
  },
};

export const CustomWidth: Story = {
  render: (args) => <SidePanelTemplate {...args} />,
  args: {
    width: 600,
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Wide Side Panel
        </Typography>
        <Typography variant="body1">
          This side panel has a custom width of 600px, making it wider than the default.
        </Typography>
      </Box>
    ),
  },
};

export const NoBackdrop: Story = {
  render: (args) => <SidePanelTemplate {...args} />,
  args: {
    hideBackdrop: true,
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          No Backdrop
        </Typography>
        <Typography variant="body1">
          This side panel doesn't show a backdrop, allowing interaction with the main content.
        </Typography>
      </Box>
    ),
  },
};

export const LongContent: Story = {
  render: (args) => <SidePanelTemplate {...args} />,
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Long Content Panel
        </Typography>
        {Array.from({ length: 20 }, (_, index) => (
          <Typography key={index} variant="body1" paragraph>
            This is paragraph {index + 1}. This side panel contains a lot of content to demonstrate
            scrolling behavior when the content exceeds the viewport height.
          </Typography>
        ))}
      </Box>
    ),
  },
};
