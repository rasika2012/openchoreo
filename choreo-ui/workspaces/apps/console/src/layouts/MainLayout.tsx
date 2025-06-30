import {
  Box,
} from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useMemo, useCallback } from "react";
import { useLocation } from "react-router";
import { ExtentionMounter, useHomePath, useMainNavExtentions, useOrgHandle } from "@open-choreo/plugin-core";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Extracted components for better organization and performance
const LayoutHeader = React.memo(() => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <ExtentionMounter extentionPointId="header.left" />
    <ExtentionMounter extentionPointId="header.right" />
  </Box>
));

const LayoutFooter = React.memo(() => (
  <Box>Footer</Box>
));

const LayoutRightSidebar = React.memo(() => (
  <ExtentionMounter extentionPointId="sidebar.right" />
));

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigationEntries = useMainNavExtentions();
  const homePath = useHomePath();
  const orgHandle = useOrgHandle();

  console.log(orgHandle, homePath, navigationEntries, "orgHandle");

  // Memoize the processed menu items to prevent unnecessary re-computations
  const processedMenuItems = useMemo(() => {
    if (!orgHandle || !navigationEntries?.length) {
      return [];
    }

    return navigationEntries.map(mainEntry => ({
      ...mainEntry,
      href: typeof mainEntry.href === 'string' ? homePath + mainEntry.href : undefined,
      subMenuItems: mainEntry?.subMenuItems?.map(subEntry => ({
        ...subEntry,
        href: typeof subEntry.href === 'string' ? homePath + mainEntry.href + subEntry.href : undefined,
      }))
    }));
  }, [orgHandle, navigationEntries, homePath]);

  // Memoize the selected menu item calculation to avoid unnecessary re-renders
  const selectedMenuItem = useMemo(() => {
    const currentPath = location.pathname;

    // First check if any submenu item matches the current path
    for (const entry of navigationEntries) {
      if (entry.subMenuItems) {
        const matchingSubmenu = entry.subMenuItems.find(submenu => submenu.href === currentPath);
        if (matchingSubmenu) {
          return matchingSubmenu.id;
        }
      }
    }

    // If no submenu matches, check if any main menu item matches
    const matchingEntry = navigationEntries.find(entry => entry.href === currentPath);
    if (matchingEntry) {
      return matchingEntry.id;
    }

    // Fallback to first navigation entry if no match found
    return navigationEntries?.[0]?.id;
  }, [location.pathname, navigationEntries]);

  // Memoize the menu item click handler
  const handleMenuItemClick = useCallback((menuId: string) => {
    // This function can be extended with additional logic if needed
    // For now, it's just a placeholder since the BaseMainLayout handles the selection
  }, []);
  console.log(processedMenuItems, "processedMenuItems");
  return (
    <BaseMainLayout
      footer={<LayoutFooter />}
      header={<LayoutHeader />}
      menuItems={processedMenuItems}
      rightSidebar={<LayoutRightSidebar />}
      selectedMenuItem={selectedMenuItem}
      onMenuItemClick={handleMenuItemClick}
    >
      {children}
    </BaseMainLayout>
  );
} 