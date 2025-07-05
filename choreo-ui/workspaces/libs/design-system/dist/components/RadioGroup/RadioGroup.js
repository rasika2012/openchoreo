import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledRadioGroup } from './RadioGroup.styled';
/**
 * RadioGroup component
 * @component
 */
export const RadioGroup = React.forwardRef(({ children, className, onClick, disabled = false, ...props }) => {
    return (_jsx(StyledRadioGroup, { className: className, onClick: disabled ? undefined : onClick, disabled: disabled, row: props.row, ...props, children: disabled
            ? React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        disabled: true,
                    });
                }
                return child;
            })
            : children }));
});
RadioGroup.displayName = 'RadioGroup';
//# sourceMappingURL=RadioGroup.js.map