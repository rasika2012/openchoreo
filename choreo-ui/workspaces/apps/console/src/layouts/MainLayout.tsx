import {
  Box,
  type NavItemExpandableSubMenu,
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useState } from "react";
import { registry, PluginEntryType } from "@open-choreo/plugins";

const navigationEntries: NavItemExpandableSubMenu[] = registry.flatMap(plugin => plugin.entries.filter(entry => entry.type === PluginEntryType.NAVIGATION).map(entry => ({
  title: entry.name,
  id: entry.name,
  icon: <entry.icon />,
  selectedIcon: <entry.iconSelected />,
  // path: entry.path,
  href: entry.path,
  // subMenuItems: [],
  // subMenuItems: entry.,
} as NavItemExpandableSubMenu)));

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    navigationEntries[0].id,
  );

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