"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSelect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SimpleSelect_styled_1 = require("./SimpleSelect.styled");
const material_1 = require("@mui/material");
const ChevronDown_1 = __importDefault(require("@design-system/Icons/generated/ChevronDown"));
const Info_1 = __importDefault(require("@design-system/Icons/generated/Info"));
const clsx_1 = __importDefault(require("clsx"));
/**
 * SimpleSelect component
 * @component
 */
exports.SimpleSelect = react_1.default.forwardRef(({ children, className, onClick, disabled = false, startAdornment, isLoading, testId, value, onChange, size, anchorOrigin, transformOrigin, renderValue, error, helperText, isScrollable, isSearchBarItem = false, ...props }, ref) => {
    const handleClick = react_1.default.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    const handleChange = react_1.default.useCallback((event) => {
        onChange(event);
    }, [onChange]);
    const CircularLoader = () => ((0, jsx_runtime_1.jsx)(material_1.Box, { className: "loadingIcon", children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 14 }) }));
    return ((0, jsx_runtime_1.jsxs)(SimpleSelect_styled_1.StyledSimpleSelect, { ref: ref, onClick: handleClick, disabled: disabled, className: (0, clsx_1.default)({
            simpleSelect: true,
            resetSimpleSelectStyles: props.resetStyles,
        }), isSearchBarItem: isSearchBarItem, size: size, ...props, children: [(0, jsx_runtime_1.jsx)(material_1.Select, { startAdornment: startAdornment, disabled: disabled || isLoading, "data-cyid": testId, "data-testid": testId, value: value, onChange: handleChange, disableUnderline: true, IconComponent: isLoading ? CircularLoader : ChevronDown_1.default, variant: "outlined", size: size, MenuProps: {
                    PopoverClasses: {
                        paper: `listPaper ${isScrollable ? 'scrollableList' : ''} ${startAdornment ? 'startAdornmentAlignLeft' : ''}`,
                    },
                    anchorOrigin,
                    transformOrigin,
                }, renderValue: renderValue, error: error, fullWidth: true, className: (0, clsx_1.default)({
                    root: true,
                    rootSmall: size === 'small',
                    rootMedium: size === 'medium',
                    icon: true,
                    iconSmall: size === 'small',
                    iconMedium: size === 'medium',
                    outlined: true,
                    outlinedSmall: size === 'small',
                    outlinedMedium: size === 'medium',
                }), children: children }), helperText && ((0, jsx_runtime_1.jsx)(material_1.FormHelperText, { error: error, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", children: [error && ((0, jsx_runtime_1.jsx)(material_1.Box, { className: "selectInfoIcon", children: (0, jsx_runtime_1.jsx)(Info_1.default, { fontSize: "inherit" }) })), (0, jsx_runtime_1.jsx)(material_1.Box, { ml: 1, children: helperText })] }) }))] }));
});
exports.SimpleSelect.displayName = 'SimpleSelect';
//# sourceMappingURL=SimpleSelect.js.map