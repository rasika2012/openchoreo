import { NavItemExpandableSubMenu } from '@open-choreo/design-system';
import React from 'react';
export interface SidebarProps {
    menuItems?: NavItemExpandableSubMenu[];
    selectedMenuItem?: string;
    onMenuItemClick: (menuItem: string) => void;
    isSidebarOpen?: boolean;
}
export declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;
