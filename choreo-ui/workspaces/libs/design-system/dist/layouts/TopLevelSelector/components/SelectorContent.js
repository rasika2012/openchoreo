import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { ChevronDownIcon } from '../../../Icons';
import { IconButton } from '../../../components';
/**
 * Content component for the TopLevelSelector showing the selected item and dropdown button
 */
export const SelectorContent = ({ selectedItem, onOpen, disableMenu = false, }) => (_jsxs(Box, { display: "flex", alignItems: "center", gap: 1, marginRight: 5, children: [_jsx(Typography, { variant: "body1", fontSize: 14, fontWeight: 450, color: "text.primary", children: selectedItem.label }), !disableMenu && _jsx(IconButton, { size: "tiny", disableRipple: true, onClick: onOpen, "aria-label": "Open selector menu", children: _jsx(ChevronDownIcon, {}) })] }));
//# sourceMappingURL=SelectorContent.js.map