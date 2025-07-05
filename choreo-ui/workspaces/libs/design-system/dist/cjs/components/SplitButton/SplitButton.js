"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SplitButton_styled_1 = require("./SplitButton.styled");
const material_1 = require("@mui/material");
const Icons_1 = require("@design-system/Icons");
/**
 * SplitButton component
 * @component
 */
exports.SplitButton = react_1.default.forwardRef(({ children, className, onClick, disabled = false, label, selectedValue, open, setOpen, startIcon, variant = 'contained', color = 'primary', size, testId, fullWidth = false, ...props }, ref) => {
    const handleClick = react_1.default.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    const anchorRef = react_1.default.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current &&
            anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(SplitButton_styled_1.StyledSplitButton, { ref: ref, className: className, onClick: handleClick, disabled: disabled, ...props, children: [(0, jsx_runtime_1.jsxs)(material_1.ButtonGroup, { ref: anchorRef, "aria-label": "split button", variant: variant, color: color, size: size, disabled: disabled, "data-testid": `${testId}-split`, disableFocusRipple: true, disableRipple: true, disableElevation: true, fullWidth: fullWidth, children: [(0, jsx_runtime_1.jsxs)(material_1.Button, { onClick: onClick, startIcon: startIcon, children: [label && (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [label, ":\u00A0"] }), selectedValue] }), (0, jsx_runtime_1.jsx)(material_1.Button, { "aria-controls": open ? 'split-button-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-label": "select merge strategy", "aria-haspopup": "menu", onClick: handleToggle, "data-testid": `${testId}-split-toggle-button`, children: (0, jsx_runtime_1.jsx)(Icons_1.ChevronDownIcon, { fontSize: "inherit" }) })] }), (0, jsx_runtime_1.jsx)(material_1.Popper, { open: open, anchorEl: anchorRef.current, role: undefined, transition: true, placement: "bottom-end", style: {
                    width: anchorRef.current
                        ? anchorRef.current.offsetWidth
                        : 'initial',
                }, children: ({ TransitionProps, placement }) => ((0, jsx_runtime_1.jsx)(material_1.Grow, { ...TransitionProps, style: {
                        transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
                    }, children: (0, jsx_runtime_1.jsx)(material_1.Paper, { children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, { onClickAway: handleClose, children: (0, jsx_runtime_1.jsx)(material_1.Box, { children: children }) }) }) })) })] }));
});
exports.SplitButton.displayName = 'SplitButton';
//# sourceMappingURL=SplitButton.js.map