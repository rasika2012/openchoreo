import type { Meta, StoryObj } from '@storybook/react';
import { NavItemExpandable } from './NavItemExpandable';
import { MenuHomeFilledIcon, MenuHomeIcon } from '@design-system/Icons';

const meta: Meta<typeof NavItemExpandable> = {
  title: 'Choreo DS/NavItemExpandable',
  component: NavItemExpandable,
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
type Story = StoryObj<typeof NavItemExpandable>;

export const Default: Story = {
  args: {
    title: 'NavItemExpandable Content',
    icon: <MenuHomeIcon fontSize='inherit' />,
    selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
    id: 'nav-item-1',
    subMenuItems: [
      {
        title: 'Sub Item 1',
        id: 'sub-item-1',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
      {
        title: 'Sub Item 2',
        id: 'sub-item-2',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
      {
        title: 'Sub Item 3',
        id: 'sub-item-3',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
    ],
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
    title: 'NavItemExpandable Content',
    icon: <MenuHomeIcon fontSize='inherit' />,
    selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
    id: 'nav-item-1',
    selectedId: 'sub-item-1',
    subMenuItems: [
      {
        title: 'Sub Item 1',
        id: 'sub-item-1',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
      {
        title: 'Sub Item 2',
        id: 'sub-item-2',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
      {
        title: 'Sub Item 3',
        id: 'sub-item-3',
        icon: <MenuHomeIcon fontSize='inherit' />,
        selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
      },
    ],
  },
};

export const NoSubMenuItems: Story = {
  args: {
    isExpanded: true,
    title: 'NavItemExpandable Content',
    icon: <MenuHomeIcon fontSize='inherit' />,
    selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
    id: 'nav-item-1',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled NavItemExpandable',
    disabled: true,
    icon: <MenuHomeIcon fontSize='inherit' />,
    selectedIcon: <MenuHomeFilledIcon fontSize='inherit' />,
  },
};
