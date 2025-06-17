import React from 'react';
import { AvatarProps, StyledAvatar } from './Avatar.styled';

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledAvatar ref={ref} {...props}>
        {children}
      </StyledAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';
