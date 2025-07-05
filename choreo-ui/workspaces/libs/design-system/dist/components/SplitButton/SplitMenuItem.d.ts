import { MenuItemProps } from '@mui/material';
import { ComponentType } from 'react';
interface SplitMenuItemProps extends MenuItemProps {
    colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}
declare const SplitMenuItem: ComponentType<SplitMenuItemProps>;
export default SplitMenuItem;
