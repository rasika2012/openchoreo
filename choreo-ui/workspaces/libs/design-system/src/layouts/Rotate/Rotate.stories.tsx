import type { Meta, StoryObj } from '@storybook/react';
import { Rotate } from './Rotate';
import { ReloadIcon } from '@design-system/Icons';

const meta: Meta<typeof Rotate> = {
  title: 'Choreo DS/Rotate',
  component: Rotate,
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
  },
};

export default meta;
type Story = StoryObj<typeof Rotate>;

export const Default: Story = {
  args: {
    children: <ReloadIcon />,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Rotate',
    disabled: true,
  },
};
