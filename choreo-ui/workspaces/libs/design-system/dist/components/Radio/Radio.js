import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledRadio, StyledRadioIndicator } from './Radio.styled';
import { FormControlLabel } from '@mui/material';
/**
 * Radio component
 * @component
 */
export const Radio = React.forwardRef(({ children, className, onClick, disabled = false, ...restProps }) => {
    const styledRadioProps = {
        className,
        onClick,
        disabled,
    };
    const radioIndicatorProps = {
        disabled,
        ...restProps,
    };
    return (_jsx(StyledRadio, { ...styledRadioProps, children: _jsx(FormControlLabel, { control: _jsx(StyledRadioIndicator, { ...radioIndicatorProps, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true }), label: children, disabled: disabled }) }));
});
Radio.displayName = 'Radio';
//# sourceMappingURL=Radio.js.map