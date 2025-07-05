import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledChip } from './Chip.styled';
/**
 * Chip component
 * @component
 */
export const Chip = React.forwardRef(({ children, className, disabled = false, size = 'medium', variant = 'filled', color = 'default', ...props }, ref) => {
    return (_jsx(StyledChip, { ref: ref, ...props, size: size, variant: variant === 'filled' ? 'filled' : 'outlined', color: color, label: props.label, className: className, disabled: disabled, "data-cyid": `${props.testId}-chip`, children: children }));
});
Chip.displayName = 'Chip';
//# sourceMappingURL=Chip.js.map