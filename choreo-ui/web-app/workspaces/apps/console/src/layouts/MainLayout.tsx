import {
  Box,
  MenuHomeIcon,
  MenuHomeFilledIcon,
  MenuProjectIcon,
  MenuProjectFilledIcon,
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout, type MainMenuItem } from "@open-choreo/common-views";
import { useState } from "react";

const mockMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: <MenuHomeIcon fontSize="inherit" />,
    filledIcon: <MenuHomeFilledIcon fontSize="inherit" />,
    path: "/home",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <MenuProjectIcon fontSize="inherit" />,
    filledIcon: <MenuProjectFilledIcon fontSize="inherit" />,
    path: "/projects",
  },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MainMenuItem>(
    mockMenuItems[0],
  );

  return (
    <BaseMainLayout
      footer={<Box>Footer</Box>}
      header={<Box>Header</Box>}
      menuItems={mockMenuItems}
      rightSidebar={<Box>Right Sidebar</Box>}
      selectedMenuItem={selectedMenuItem}
      onMenuItemClick={setSelectedMenuItem}
    >
      {children}
    </BaseMainLayout>
  );
} 