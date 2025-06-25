import {
  Box,
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { ExtentionMounter, useMainNavExtentions } from "@open-choreo/plugin-core";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigationEntries = useMainNavExtentions();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    navigationEntries?.[0]?.id,
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
      header={
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <ExtentionMounter extentionPointId="header.left" />
          <ExtentionMounter extentionPointId="header.right" />
        </Box>
      }
      menuItems={navigationEntries}
      rightSidebar={<ExtentionMounter extentionPointId="sidebar.right" />}
      selectedMenuItem={selectedMenuItem}
      onMenuItemClick={setSelectedMenuItem}
    >
      {children}
    </BaseMainLayout>
  );
} 