import { NavItemBase } from '@open-choreo/design-system';
interface MenuMenuItemProps extends NavItemBase {
    id: string;
    isExpanded: boolean;
    onClick: (id: string) => void;
    subMenuItems?: NavItemBase[];
    selectedKey?: string;
    disabled?: boolean;
}
export declare function MenuItem({ id, icon, onClick, selectedKey, subMenuItems, isExpanded, disabled, title, selectedIcon, href, pathPattern, }: MenuMenuItemProps): import("react/jsx-runtime").JSX.Element;
export {};
