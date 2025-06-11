import {
  useChoreoTheme,
  useMediaQuery,
  Box,
  MenuExpandIcon,
  MenuCollapseIcon,
} from '@open-choreo/design-system';
import React, { useState } from 'react';
import { MainMenuItem } from '../types';
import { MenuItem } from '../MenuItem';
import { debounce } from 'lodash';

export interface SidebarProps {
  menuItems?: MainMenuItem[];
  selectedMenuItem?: MainMenuItem;
  onMenuItemClick: (menuItem: MainMenuItem) => void;
  isSidebarOpen?: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ menuItems, selectedMenuItem, onMenuItemClick, isSidebarOpen }, ref) => {
    const theme = useChoreoTheme();
    const isMobile = useMediaQuery('md', 'down');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandSaved, setIsExpandSaved] = useState(false);

    const isFullWidth = isExpanded || isExpandSaved;

    const handleExpandWithDebouce = debounce((state: boolean) => {
      setIsExpanded(state);
    }, 300);

    return (
      <Box height="100%" display="flex" position='relative' ref={ref}>
        {(isMobile || !isExpandSaved) && <Box width={theme.spacing(7.25)}/>}
        <Box
          backgroundColor={theme.pallet.primary.main}
          position={(isMobile || !isExpandSaved) ? 'absolute' : 'relative'}
          transition={theme.transitions.create(['display', 'width'], {
            duration: 300,
          })}
          width={
            isMobile && !isSidebarOpen
              ? 0
              : !isFullWidth && !isMobile
                ? theme.spacing(7.25)
                : theme.spacing(30)
          }
          overflow="hidden"
          height="100%"
          maxWidth={theme.spacing(40)}
          justifyContent="space-between"
          display="flex"
          flexDirection="column"
        >
          <Box
            padding={theme.spacing(1)}
            display="flex"
            flexDirection="column"
            gap={theme.spacing(0.5)}
            onMouseEnter={() => handleExpandWithDebouce(true)}
            onMouseLeave={() => handleExpandWithDebouce(false)}
          >
            {menuItems?.map((item) => (
              <MenuItem
                key={item.id}
                {...item}
                isSelected={item.id === selectedMenuItem?.id}
                onClick={() => onMenuItemClick(item)}
                isExpanded={isFullWidth || isMobile}
              />
            ))}
          </Box>
          <Box borderTop="small" borderColor={theme.pallet.primary.light}>
            <MenuItem
              id="menu-item-collapse"
              path=""
              key="menu-item-collapse"
              label="Collapse"
              icon={
                isExpandSaved ? (
                  <MenuCollapseIcon fontSize="inherit" />
                ) : (
                  <MenuExpandIcon fontSize="inherit" />
                )
              }
              onClick={() => setIsExpandSaved(!isExpandSaved)}
              isSelected={false}
              isExpanded={isFullWidth}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

Sidebar.displayName = 'Sidebar'; 