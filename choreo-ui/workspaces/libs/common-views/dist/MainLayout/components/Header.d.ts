import React from 'react';
export interface HeaderProps {
    children?: React.ReactNode;
    isSidebarOpen?: boolean;
    onSidebarToggle?: () => void;
}
export declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>;
