import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { CloseIcon } from '../../../Icons';
import { IconButton } from '../../../components';
import { getLevelLabel } from '../utils';
/**
 * Header component for the TopLevelSelector showing the level label and close button
 */
export const SelectorHeader = ({ level, onClose }) => (_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", flexGrow: 1, children: [_jsx(Typography, { variant: "body2", fontSize: 11, color: "text.secondary", children: getLevelLabel(level) }), onClose && (_jsx(IconButton, { size: "tiny", color: "secondary", disableRipple: true, onClick: (e) => {
                e.stopPropagation();
                onClose?.();
            }, "aria-label": "Close selector", children: _jsx(CloseIcon, { fontSize: "inherit" }) }))] }));
//# sourceMappingURL=SelectorHeader.js.map