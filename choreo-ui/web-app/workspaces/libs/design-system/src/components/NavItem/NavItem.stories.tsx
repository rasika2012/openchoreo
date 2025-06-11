import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';
import { MenuHomeFilledIcon, MenuHomeIcon } from '@design-system/Icons';

const meta: Meta<typeof NavItem> = {
  title: 'Choreo DS/NavItem',
  component: NavItem,
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
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    title: 'NavItem Content',
    icon: <MenuHomeIcon />,
    selectedIcon: <MenuHomeFilledIcon />,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled NavItem',
    disabled: true,
  },
};
