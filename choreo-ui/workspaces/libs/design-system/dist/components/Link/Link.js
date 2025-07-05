import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledLink } from './Link.styled';
export const Link = React.forwardRef(({ children, ...props }, ref) => {
    return (_jsx(StyledLink, { ref: ref, ...props, testId: `${props.testId}-link`, "data-cyid": `${props.testId}-link`, children: children }));
});
Link.displayName = 'Link';
//# sourceMappingURL=Link.js.map