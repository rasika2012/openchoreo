import {
  Box,
  type NavItemExpandableSubMenu,
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { registry, PluginEntryType } from "@open-choreo/plugins";

const navigationEntries: NavItemExpandableSubMenu[] = registry.flatMap(plugin => plugin.entries.filter(entry => entry.type === PluginEntryType.NAVIGATION).map(entry => ({
  title: entry.name,
  id: entry.name,
  icon: <entry.icon />,
  selectedIcon: <entry.iconSelected />,
  href: entry.path,
  subMenuItems: entry.submenu?.map(submenu => ({
    title: submenu.name,
    id: submenu.name,
    icon: <submenu.icon />,
    selectedIcon: <submenu.iconSelected />,
    href: submenu.path,
  })),
} as NavItemExpandableSubMenu)));

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    navigationEntries[0].id,
  );

  // Update selected menu item based on current path
  useEffect(() => {
    const currentPath = location.pathname;

    // First check if any submenu item matches the current path
    for (const entry of navigationEntries) {
      if (entry.subMenuItems) {
        const matchingSubmenu = entry.subMenuItems.find(submenu => submenu.href === currentPath);
        if (matchingSubmenu) {
          setSelectedMenuItem(matchingSubmenu.id);
          return;
        }
      }
    }

    // If no submenu matches, check if any main menu item matches
    const matchingEntry = navigationEntries.find(entry => entry.href === currentPath);
    if (matchingEntry) {
      setSelectedMenuItem(matchingEntry.id);
    }
  }, [location.pathname]);

  return (
    <BaseMainLayout
      footer={<Box>Footer</Box>}
      header={<Box>Header</Box>}
      menuItems={navigationEntries}
      rightSidebar={<Box>Right Sidebar</Box>}
      selectedMenuItem={selectedMenuItem}
      onMenuItemClick={setSelectedMenuItem}
    >
      {children}
    </BaseMainLayout>
  );
} 