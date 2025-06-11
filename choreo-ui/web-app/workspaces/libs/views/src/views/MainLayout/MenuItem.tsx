import { NavItem } from '@open-choreo/design-system';
import { MainMenuItem } from './types';

interface MenuMenuItemProps extends MainMenuItem {
  key: string;
  isSelected: boolean;
  isExpanded: boolean;
  onClick: () => void;
}
export function MenuItem({
  key,
  label,
  icon,
  filledIcon,
  onClick,
  isSelected,
  isExpanded,
}: MenuMenuItemProps) {
  return (
    <NavItem
      key={key}
      onClick={() => onClick()}
      title={label}
      icon={icon}
      selectedIcon={filledIcon}
      isSelected={isSelected}
      isExpanded={isExpanded}
    />
  );
}
