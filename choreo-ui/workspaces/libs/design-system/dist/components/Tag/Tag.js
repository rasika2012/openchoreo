import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledTag } from './Tag.styled';
import { Close } from '@mui/icons-material';
export const Tag = React.forwardRef(({ children, readOnly, ...props }, ref) => {
    return (_jsx(StyledTag, { ref: ref, ...props, "data-cyid": props.testId, disabled: props.disabled, className: props.className, label: children ? String(children) : undefined, deleteIcon: !readOnly ? _jsx(Close, {}) : undefined, onDelete: !readOnly ? props.onClick : undefined, children: children }));
});
Tag.displayName = 'Tag';
//# sourceMappingURL=Tag.js.map