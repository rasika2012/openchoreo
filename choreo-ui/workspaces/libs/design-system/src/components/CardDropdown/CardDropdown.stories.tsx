import type { Meta, StoryObj } from '@storybook/react';
import { CardDropdown } from './CardDropdown';

const meta: Meta<typeof CardDropdown> = {
  title: 'Choreo DS/CardDropdown',
  component: CardDropdown,
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
type Story = StoryObj<typeof CardDropdown>;

export const Default: Story = {
  args: {
    children: 'CardDropdown Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled CardDropdown',
    disabled: true,
  },
};
