"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const CardDropdown_styled_1 = require("./CardDropdown.styled");
const ChevronUp_1 = __importDefault(require("@design-system/Icons/generated/ChevronUp"));
const ChevronDown_1 = __importDefault(require("@design-system/Icons/generated/ChevronDown"));
const material_1 = require("@mui/material");
/**
 * CardDropdown component
 * @component
 */
exports.CardDropdown = react_1.default.forwardRef(({ children, icon, text, active = false, testId, size = 'medium', fullHeight = false, ...props }, _ref) => {
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const [buttonWidth, setButtonWidth] = react_1.default.useState(0);
    const theme = (0, material_1.useTheme)();
    const buttonRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        if (buttonRef.current) {
            const width = buttonRef.current.clientWidth;
            setButtonWidth(width);
        }
    }, []);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'card-popover' : undefined;
    const handleMenuItemClick = (onClick) => (event) => {
        handleClose();
        if (onClick) {
            onClick(event);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsxs)(CardDropdown_styled_1.StyledCardDropdown, { ref: buttonRef, "aria-describedby": id, onClick: handleClick, "data-cyid": `${testId}-card-button`, "data-card-dropdown-size": size, "data-button-root-full-height": fullHeight, "data-button-root-active": active, ...props, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { className: "startIcon", children: icon }), (0, jsx_runtime_1.jsx)(material_1.Box, { children: text }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "endIcon", children: open ? ((0, jsx_runtime_1.jsx)(ChevronUp_1.default, { fontSize: "inherit" })) : ((0, jsx_runtime_1.jsx)(ChevronDown_1.default, { fontSize: "inherit" })) })] }), (0, jsx_runtime_1.jsx)(material_1.Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, PaperProps: {
                    style: {
                        width: buttonWidth,
                        maxHeight: theme.spacing(40),
                        boxShadow: theme.shadows[3],
                        border: `1px solid ${theme.palette.grey[100]}`,
                        borderRadius: '8px',
                    },
                    className: 'popoverPaper',
                }, elevation: 0, "data-cyid": `${testId}-popover`, children: (0, jsx_runtime_1.jsx)(material_1.MenuList, { children: react_1.default.Children.map(children, (menuItem) => {
                        if (!menuItem)
                            return null;
                        return ((0, jsx_runtime_1.jsx)("div", { children: react_1.default.cloneElement(menuItem, {
                                onClick: handleMenuItemClick(menuItem.props.onClick),
                            }) }));
                    }) }) })] }));
});
exports.CardDropdown.displayName = 'CardDropdown';
//# sourceMappingURL=CardDropdown.js.map