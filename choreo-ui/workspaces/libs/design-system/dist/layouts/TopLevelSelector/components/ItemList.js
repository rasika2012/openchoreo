import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
/**
 * List component for displaying items in the TopLevelSelector popover
 */
export const ItemList = ({ title, items, selectedItemId, onSelect, }) => (_jsxs(Box, { display: "flex", flexDirection: "column", children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: title }), _jsx(List, { children: items.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSelect(item);
                    }, selected: item.id === selectedItemId, disableRipple: true, children: _jsx(ListItemText, { primary: item.label }) }) }, item.id))) })] }));
//# sourceMappingURL=ItemList.js.map