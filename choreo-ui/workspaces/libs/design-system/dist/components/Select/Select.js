import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, FormHelperText, InputAdornment, Popper, TextField, Typography, Autocomplete as MUIAutocomplete, } from '@mui/material';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { StyledSelect } from './Select.styled';
import ChevronDown from '../../Icons/generated/ChevronDown';
import Close from '../../Icons/generated/Close';
import Info from '../../Icons/generated/Info';
import Question from '../../Icons/generated/Question';
import AddIcon from '../../Icons/generated/Add';
function SelectComponent(props) {
    const { name, label, labelId, options, error, getOptionLabel, getOptionIcon, helperText, loadingText, placeholder, disabled, tooltip, optional, tooltipPlacement = 'right', size = 'medium', onAddClick, addBtnText, value, onChange, getOptionValue = getOptionLabel, InputProps, getOptionSelected, startIcon, onBlur, info, actions, renderOption, enableOverflow, getOptionDisabled, testId, isClearable, isLoading, } = props;
    const CreateAction = Symbol.for('selectCreateAction');
    const classes = {
        selectRoot: 'selectRoot',
        listbox: 'listbox',
        option: 'option',
        clearIndicator: 'clearIndicator',
        loadingIcon: 'loadingIcon',
        createButton: 'createButton',
        listItemContent: 'listItemContent',
        listItemImgWrap: 'listItemImgWrap',
        listItemImg: 'listItemImg',
        startAdornment: 'startAdornment',
        selectInfoIcon: 'selectInfoIcon',
        loadingTextLoader: 'loadingTextLoader',
        formLabel: 'formLabel',
        formLabelInfo: 'formLabelInfo',
        formLabelTooltip: 'formLabelTooltip',
        formOptional: 'formOptional',
        formLabelAction: 'formLabelAction',
        tooltipIcon: 'tooltipIcon',
        popupIcon: 'popupIcon',
    };
    const toolTip = tooltip && (_jsx(Tooltip, { title: typeof tooltip === 'string' ? tooltip : '', placement: tooltipPlacement, disabled: !tooltip, children: _jsx(Box, { className: classes.tooltipIcon, children: _jsx(Box, { className: classes.selectInfoIcon, children: _jsx(Question, { fontSize: "inherit" }) }) }) }));
    const updateOptions = useMemo(() => {
        const updateValues = options ? options.slice() : [];
        if (addBtnText && onAddClick) {
            updateValues.unshift(CreateAction);
        }
        return updateValues;
    }, [options, addBtnText, onAddClick, CreateAction]);
    return (_jsxs(StyledSelect, { "data-testid": testId, children: [(label || toolTip || info || optional || actions) && (_jsxs(Box, { className: classes.formLabel, children: [_jsxs(Box, { display: "flex", alignItems: "center", gap: 1, children: [label && (_jsx(Typography, { component: "h6", variant: "body1", children: label })), info && _jsx(Box, { className: classes.formLabelInfo, children: info }), toolTip && (_jsx(Box, { className: classes.formLabelTooltip, children: toolTip })), optional && (_jsx(Typography, { variant: "body2", className: classes.formOptional, children: "(Optional)" }))] }), actions && (_jsx(Box, { sx: { ml: 'auto', display: 'flex', alignItems: 'center' }, className: classes.formLabelAction, children: actions }))] })), _jsx(MUIAutocomplete, { classes: {
                    root: classes.selectRoot,
                    listbox: classes.listbox,
                    option: classes.option,
                    clearIndicator: classes.clearIndicator,
                    endAdornment: clsx({
                        [classes.loadingIcon]: isLoading,
                    }),
                }, clearIcon: _jsx(IconButton, { size: "small", testId: "selector-clear", variant: "text", disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, children: _jsx(Close, { fontSize: "inherit", color: "secondary" }) }), id: labelId, "data-cyid": `${testId}-select`, "data-testid": testId, size: size, disabled: disabled || isLoading, disableClearable: !isClearable, options: updateOptions, value: value, slots: {
                    popper: enableOverflow
                        ? (popoverProps) => (_jsx(Popper, { ...popoverProps, style: {
                                ...popoverProps.style,
                                minWidth: popoverProps.style?.width,
                                width: 'auto',
                                zIndex: 1300,
                            }, placement: "bottom-start" }))
                        : undefined,
                }, getOptionLabel: (optionVal) => {
                    if (CreateAction === optionVal) {
                        return '';
                    }
                    return getOptionLabel(optionVal);
                }, popupIcon: _jsx(Box, { className: classes.popupIcon, children: isLoading ? (_jsx(CircularProgress, { size: 16 })) : (_jsx(IconButton, { size: "small", testId: "selector-dropdown", variant: "text", className: classes.popupIcon, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, children: _jsx(ChevronDown, { fontSize: "inherit", color: "secondary" }) })) }), onChange: (_, val) => {
                    if (val === null) {
                        if (isClearable) {
                            onChange(null);
                        }
                        return;
                    }
                    if (CreateAction === val) {
                        if (onAddClick) {
                            onAddClick();
                        }
                        return;
                    }
                    onChange(val);
                }, onBlur: onBlur, isOptionEqualToValue: (optionVal, val) => {
                    if (CreateAction === optionVal) {
                        return false;
                    }
                    if (getOptionSelected) {
                        return getOptionSelected(optionVal, val);
                    }
                    return getOptionValue(optionVal) === getOptionValue(val);
                }, getOptionDisabled: getOptionDisabled, renderOption: (renderProps, optionVal) => {
                    const labelVal = getOptionLabel(optionVal);
                    const itemIcon = getOptionIcon && getOptionIcon(optionVal);
                    if (CreateAction === optionVal) {
                        return (_createElement("li", { ...renderProps, key: "create-action" },
                            _jsx(Button, { fullWidth: true, onClick: onAddClick, variant: "text", className: classes.createButton, startIcon: _jsx(AddIcon, {}), testId: `${testId}-create-button`, children: addBtnText })));
                    }
                    return (_createElement("li", { ...renderProps, key: labelVal },
                        _jsx(Box, { className: classes.listItemContent, children: renderOption ? (renderOption(optionVal)) : (_jsxs(Box, { className: classes.listItemImgWrap, display: "flex", flexDirection: "row", alignItems: "center", gap: 1, children: [itemIcon && (_jsx(Box, { className: classes.listItemImgWrap, children: _jsx("img", { className: classes.listItemImg, src: itemIcon, alt: labelVal, height: 10, width: 10 }) })), _jsx(Typography, { variant: "body2", noWrap: true, children: labelVal })] })) })));
                }, renderInput: ({ InputProps: _InputProps, ...params }) => (_jsx(TextField, { InputProps: {
                        ..._InputProps,
                        ...InputProps,
                        startAdornment: startIcon && (_jsx(InputAdornment, { className: classes.startAdornment, position: "start", children: startIcon })),
                    }, name: name, ...params, variant: "outlined", error: error, disabled: disabled || isLoading, placeholder: placeholder, size: size })) }), helperText && (_jsx(FormHelperText, { error: error, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Box, { className: classes.selectInfoIcon, children: _jsx(Info, { fontSize: "inherit" }) }), _jsx(Box, { ml: 1, children: helperText })] }) })), loadingText && (_jsx(FormHelperText, { children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(CircularProgress, { size: 12, className: classes.loadingTextLoader }), _jsx(Box, { ml: 1, children: loadingText })] }) }))] }));
}
export const Select = React.forwardRef(SelectComponent);
Select.displayName = 'Select';
//# sourceMappingURL=Select.js.map