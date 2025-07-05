import React from 'react';
export interface NavItemBase {
    title: string;
    id: string;
    icon: React.ReactNode;
    href?: string;
    selectedIcon: React.ReactNode;
    pathPattern: string;
}
export interface NavItemExpandableSubMenu extends NavItemBase {
    subMenuItems?: NavItemBase[];
    href?: string;
}
export interface NavItemExpandableProps extends NavItemExpandableSubMenu {
    className?: string;
    onClick?: (id: string) => void;
    disabled?: boolean;
    selectedId?: string;
    isExpanded?: boolean;
}
/**
 * NavItemExpandable component
 * @component
 */
export declare const NavItemExpandable: React.ForwardRefExoticComponent<NavItemExpandableProps & React.RefAttributes<HTMLDivElement>>;
