import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledTable } from './TableDefault.styled';
export const TableDefault = React.forwardRef(({ children, className, variant = 'default', testId = undefined }, ref) => {
    return (_jsx(StyledTable, { ref: ref, className: className, variant: variant, "data-testid": testId, children: children }));
});
TableDefault.displayName = 'TableDefault';
//# sourceMappingURL=TableDefault.js.map