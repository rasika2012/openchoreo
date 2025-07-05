import { NavItemExpandableSubMenu } from '@open-choreo/design-system';
import React from 'react';
export interface MainLayoutProps {
    children?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    testId?: string;
    menuItems?: NavItemExpandableSubMenu[];
    selectedMenuItem?: string;
    onMenuItemClick: (menu: string) => void;
}
export declare const MainLayout: React.ForwardRefExoticComponent<MainLayoutProps & React.RefAttributes<HTMLDivElement>>;
