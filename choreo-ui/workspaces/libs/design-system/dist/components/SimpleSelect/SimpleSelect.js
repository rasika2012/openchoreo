import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledSimpleSelect } from './SimpleSelect.styled';
import { Box, CircularProgress, FormHelperText, Select as MUISelect, } from '@mui/material';
import ChevronDown from '../../Icons/generated/ChevronDown';
import Info from '../../Icons/generated/Info';
import clsx from 'clsx';
/**
 * SimpleSelect component
 * @component
 */
export const SimpleSelect = React.forwardRef(({ children, className, onClick, disabled = false, startAdornment, isLoading, testId, value, onChange, size, anchorOrigin, transformOrigin, renderValue, error, helperText, isScrollable, isSearchBarItem = false, ...props }, ref) => {
    const handleClick = React.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    const handleChange = React.useCallback((event) => {
        onChange(event);
    }, [onChange]);
    const CircularLoader = () => (_jsx(Box, { className: "loadingIcon", children: _jsx(CircularProgress, { size: 14 }) }));
    return (_jsxs(StyledSimpleSelect, { ref: ref, onClick: handleClick, disabled: disabled, className: clsx({
            simpleSelect: true,
            resetSimpleSelectStyles: props.resetStyles,
        }), isSearchBarItem: isSearchBarItem, size: size, ...props, children: [_jsx(MUISelect, { startAdornment: startAdornment, disabled: disabled || isLoading, "data-cyid": testId, "data-testid": testId, value: value, onChange: handleChange, disableUnderline: true, IconComponent: isLoading ? CircularLoader : ChevronDown, variant: "outlined", size: size, MenuProps: {
                    PopoverClasses: {
                        paper: `listPaper ${isScrollable ? 'scrollableList' : ''} ${startAdornment ? 'startAdornmentAlignLeft' : ''}`,
                    },
                    anchorOrigin,
                    transformOrigin,
                }, renderValue: renderValue, error: error, fullWidth: true, className: clsx({
                    root: true,
                    rootSmall: size === 'small',
                    rootMedium: size === 'medium',
                    icon: true,
                    iconSmall: size === 'small',
                    iconMedium: size === 'medium',
                    outlined: true,
                    outlinedSmall: size === 'small',
                    outlinedMedium: size === 'medium',
                }), children: children }), helperText && (_jsx(FormHelperText, { error: error, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [error && (_jsx(Box, { className: "selectInfoIcon", children: _jsx(Info, { fontSize: "inherit" }) })), _jsx(Box, { ml: 1, children: helperText })] }) }))] }));
});
SimpleSelect.displayName = 'SimpleSelect';
//# sourceMappingURL=SimpleSelect.js.map