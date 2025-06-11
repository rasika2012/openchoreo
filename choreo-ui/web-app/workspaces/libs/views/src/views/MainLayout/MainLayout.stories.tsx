import {
  Box,
  MenuHomeFilledIcon,
  MenuHomeIcon,
  MenuOverviewFilledIcon,
  MenuOverviewIcon,
} from '@open-choreo/design-system';
import { MainLayout } from './MainLayout';
import type { Meta, StoryObj } from '@storybook/react';
import { MainMenuItem } from './types';
import { useState } from 'react';

const menuItems: MainMenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <MenuHomeIcon fontSize="inherit" />,
    filledIcon: <MenuHomeFilledIcon fontSize="inherit" />,
    path: '/',
  },
  {
    id: 'overview',
    label: 'Overview',
    icon: <MenuOverviewIcon fontSize="inherit" />,
    filledIcon: <MenuOverviewFilledIcon fontSize="inherit" />,
    path: '/overview',
  },
];

const rightElement = <Box height="100%">This is the Right Element</Box>;

const header = (
  <Box flexGrow={1} height="100%" display="flex">
    This is the Header
  </Box>
);

const footer = (
  <Box flexGrow={1} height="100%" display="flex">
    This is the Footer
  </Box>
);

const MainLayoutWithState = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    MainMenuItem | undefined
  >(menuItems[0]);

  const menuItemsWithHandlers = menuItems.map((item) => ({
    ...item,
    onClick: () => setSelectedMenuItem(item),
  }));

  return (
    <MainLayout
      menuItems={menuItemsWithHandlers}
      selectedMenuItem={selectedMenuItem}
      rightSidebar={rightElement}
      header={header}
      footer={footer}
      onMenuItemClick={setSelectedMenuItem}
    >
      MainLayout Content - Selected: {selectedMenuItem?.label}
    </MainLayout>
  );
};

const meta: Meta<typeof MainLayout> = {
  title: 'Choreo Views/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Layout: Story = {
  render: () => <MainLayoutWithState />,
};
