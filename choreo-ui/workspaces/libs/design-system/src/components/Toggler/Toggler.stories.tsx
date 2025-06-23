import type { Meta, StoryObj } from '@storybook/react';
import { Toggler } from './Toggler';

const meta: Meta<typeof Toggler> = {
  title: 'Components/Toggler',
  component: Toggler,
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
type Story = StoryObj<typeof Toggler>;

export const Default: Story = {
  args: {
    children: 'Toggler Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Toggler',
    disabled: true,
  },
};
