import React from 'react';
import { StyledCardDropdown } from './CardDropdown.styled';
import ChevronUp from '@design-system/Icons/generated/ChevronUp';
import ChevronDown from '@design-system/Icons/generated/ChevronDown';
import { Box, MenuList, Popover, useTheme } from '@mui/material';

export interface CardDropdownProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  'data-cyid'?: string;
  testId: string;
  size?: 'small' | 'medium' | 'large';
  fullHeight?: boolean;
}

/**
 * CardDropdown component
 * @component
 */
export const CardDropdown = React.forwardRef<HTMLDivElement, CardDropdownProps>(
  (
    {
      children,
      icon,
      text,
      active = false,
      testId,
      size = 'large',
      fullHeight = false,
      ...props
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );

    const [buttonWidth, setButtonWidth] = React.useState<number>(0);
    const theme = useTheme();
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.clientWidth;
        setButtonWidth(width);
      }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget as HTMLButtonElement);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'card-popover' : undefined;

    const handleMenuItemClick =
      (onClick: Function) => (event: React.MouseEvent<HTMLButtonElement>) => {
        handleClose();
        onClick(event);
      };

    return (
      <Box>
        <StyledCardDropdown
          ref={buttonRef}
          aria-describedby={id}
          onClick={handleClick}
          data-cyid={`${testId}-card-button`}
          {...props}
        >
          {icon}
          <Box>{text}</Box>
          {open ? (
            <ChevronUp fontSize="inherit" />
          ) : (
            <ChevronDown fontSize="inherit" />
          )}
        </StyledCardDropdown>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              width: buttonWidth,
              maxHeight: theme.spacing(40),
            },
          }}
          elevation={0}
          data-cyid={`${testId}-popover`}
        >
          <MenuList>
            {React.Children.map(children, (menuItem) => {
              if (!menuItem) return null;
              return (
                <div>
                  {React.cloneElement(menuItem as React.ReactElement<any>, {
                    onClick: handleMenuItemClick(
                      (menuItem as React.ReactElement<any>).props.onClick
                    ),
                  })}
                </div>
              );
            })}
          </MenuList>
        </Popover>
      </Box>
    );
  }
);

CardDropdown.displayName = 'CardDropdown';
