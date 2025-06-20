import {
  Box,
  MenuHomeIcon,
  MenuHomeFilledIcon,
  MenuProjectIcon,
  MenuProjectFilledIcon,
  type NavItemExpandableSubMenu,
  MenuObserveIcon,
  MenuObserveFilledIcon
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useState } from "react";

const mockMenuItems : NavItemExpandableSubMenu[] = [
  {
    title: "Home",
    id: "home",
    icon: <MenuHomeIcon fontSize="inherit" />,
    selectedIcon: <MenuHomeFilledIcon fontSize="inherit" />,
  },
  {
    title: "Projects",
    id: "projects",
    icon: <MenuProjectIcon fontSize="inherit" />,
    selectedIcon: <MenuProjectFilledIcon fontSize="inherit" />,
  },
  {
    title: "Observability",
    id: "observability",
    icon: <MenuObserveIcon fontSize="inherit" />,
    selectedIcon: <MenuObserveFilledIcon fontSize="inherit" />,
    subMenuItems: [
      {
        title: "Logs",
        id: "logs",
        icon: <MenuObserveIcon fontSize="inherit" />,
        selectedIcon: <MenuObserveFilledIcon fontSize="inherit" />,
      },
      {
        title: "Metrics",
        id: "metrics",
        icon: <MenuObserveIcon fontSize="inherit" />,
        selectedIcon: <MenuObserveFilledIcon fontSize="inherit" />,
      },
    ]
  }
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    mockMenuItems[0].id ,
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