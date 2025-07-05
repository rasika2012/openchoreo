import { jsx as _jsx } from "react/jsx-runtime";
import { StyledAvatar } from './Avatar.styled';
export function Avatar({ children, ...props }) {
    return (_jsx(StyledAvatar, { ...props, children: children }));
}
Avatar.displayName = 'Avatar';
//# sourceMappingURL=Avatar.js.map