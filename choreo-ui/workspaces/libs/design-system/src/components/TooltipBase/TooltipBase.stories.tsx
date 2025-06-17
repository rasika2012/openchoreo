import type { Meta, StoryObj } from '@storybook/react';
import { TooltipBase } from './TooltipBase';

const meta: Meta<typeof TooltipBase> = {
  title: 'Choreo DS/TooltipBase',
  component: TooltipBase,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TooltipBase>;

export const Default: Story = {
  args: {
    children: 'TooltipBase Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled TooltipBase',
    disabled: true,
  },
};
