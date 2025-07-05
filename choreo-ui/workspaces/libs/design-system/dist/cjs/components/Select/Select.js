"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_2 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const IconButton_1 = require("../IconButton");
const Button_1 = require("../Button");
const Tooltip_1 = require("../Tooltip");
const Select_styled_1 = require("./Select.styled");
const ChevronDown_1 = __importDefault(require("@design-system/Icons/generated/ChevronDown"));
const Close_1 = __importDefault(require("@design-system/Icons/generated/Close"));
const Info_1 = __importDefault(require("@design-system/Icons/generated/Info"));
const Question_1 = __importDefault(require("@design-system/Icons/generated/Question"));
const Add_1 = __importDefault(require("@design-system/Icons/generated/Add"));
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
    const toolTip = tooltip && ((0, jsx_runtime_1.jsx)(Tooltip_1.Tooltip, { title: typeof tooltip === 'string' ? tooltip : '', placement: tooltipPlacement, disabled: !tooltip, children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.tooltipIcon, children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.selectInfoIcon, children: (0, jsx_runtime_1.jsx)(Question_1.default, { fontSize: "inherit" }) }) }) }));
    const updateOptions = (0, react_2.useMemo)(() => {
        const updateValues = options ? options.slice() : [];
        if (addBtnText && onAddClick) {
            updateValues.unshift(CreateAction);
        }
        return updateValues;
    }, [options, addBtnText, onAddClick, CreateAction]);
    return ((0, jsx_runtime_1.jsxs)(Select_styled_1.StyledSelect, { "data-testid": testId, children: [(label || toolTip || info || optional || actions) && ((0, jsx_runtime_1.jsxs)(material_1.Box, { className: classes.formLabel, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1, children: [label && ((0, jsx_runtime_1.jsx)(material_1.Typography, { component: "h6", variant: "body1", children: label })), info && (0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.formLabelInfo, children: info }), toolTip && ((0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.formLabelTooltip, children: toolTip })), optional && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", className: classes.formOptional, children: "(Optional)" }))] }), actions && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { ml: 'auto', display: 'flex', alignItems: 'center' }, className: classes.formLabelAction, children: actions }))] })), (0, jsx_runtime_1.jsx)(material_1.Autocomplete, { classes: {
                    root: classes.selectRoot,
                    listbox: classes.listbox,
                    option: classes.option,
                    clearIndicator: classes.clearIndicator,
                    endAdornment: (0, clsx_1.default)({
                        [classes.loadingIcon]: isLoading,
                    }),
                }, clearIcon: (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { size: "small", testId: "selector-clear", variant: "text", disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, children: (0, jsx_runtime_1.jsx)(Close_1.default, { fontSize: "inherit", color: "secondary" }) }), id: labelId, "data-cyid": `${testId}-select`, "data-testid": testId, size: size, disabled: disabled || isLoading, disableClearable: !isClearable, options: updateOptions, value: value, slots: {
                    popper: enableOverflow
                        ? (popoverProps) => ((0, jsx_runtime_1.jsx)(material_1.Popper, { ...popoverProps, style: {
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
                }, popupIcon: (0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.popupIcon, children: isLoading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 16 })) : ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { size: "small", testId: "selector-dropdown", variant: "text", className: classes.popupIcon, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, children: (0, jsx_runtime_1.jsx)(ChevronDown_1.default, { fontSize: "inherit", color: "secondary" }) })) }), onChange: (_, val) => {
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
                        return ((0, react_1.createElement)("li", { ...renderProps, key: "create-action" },
                            (0, jsx_runtime_1.jsx)(Button_1.Button, { fullWidth: true, onClick: onAddClick, variant: "text", className: classes.createButton, startIcon: (0, jsx_runtime_1.jsx)(Add_1.default, {}), testId: `${testId}-create-button`, children: addBtnText })));
                    }
                    return ((0, react_1.createElement)("li", { ...renderProps, key: labelVal },
                        (0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.listItemContent, children: renderOption ? (renderOption(optionVal)) : ((0, jsx_runtime_1.jsxs)(material_1.Box, { className: classes.listItemImgWrap, display: "flex", flexDirection: "row", alignItems: "center", gap: 1, children: [itemIcon && ((0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.listItemImgWrap, children: (0, jsx_runtime_1.jsx)("img", { className: classes.listItemImg, src: itemIcon, alt: labelVal, height: 10, width: 10 }) })), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", noWrap: true, children: labelVal })] })) })));
                }, renderInput: ({ InputProps: _InputProps, ...params }) => ((0, jsx_runtime_1.jsx)(material_1.TextField, { InputProps: {
                        ..._InputProps,
                        ...InputProps,
                        startAdornment: startIcon && ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { className: classes.startAdornment, position: "start", children: startIcon })),
                    }, name: name, ...params, variant: "outlined", error: error, disabled: disabled || isLoading, placeholder: placeholder, size: size })) }), helperText && ((0, jsx_runtime_1.jsx)(material_1.FormHelperText, { error: error, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { className: classes.selectInfoIcon, children: (0, jsx_runtime_1.jsx)(Info_1.default, { fontSize: "inherit" }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { ml: 1, children: helperText })] }) })), loadingText && ((0, jsx_runtime_1.jsx)(material_1.FormHelperText, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 12, className: classes.loadingTextLoader }), (0, jsx_runtime_1.jsx)(material_1.Box, { ml: 1, children: loadingText })] }) }))] }));
}
exports.Select = react_2.default.forwardRef(SelectComponent);
exports.Select.displayName = 'Select';
//# sourceMappingURL=Select.js.map