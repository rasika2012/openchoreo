import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledRadioIndicator } from './Radio.styled';
export const RadioIndicator = React.forwardRef((props) => {
    return (_jsx(StyledRadioIndicator, { ...props, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true }));
});
RadioIndicator.displayName = 'RadioIndicator';
//# sourceMappingURL=RadioIndicator.js.map