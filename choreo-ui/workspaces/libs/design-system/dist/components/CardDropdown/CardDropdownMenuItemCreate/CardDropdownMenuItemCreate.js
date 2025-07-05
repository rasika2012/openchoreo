import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import React from 'react';
import Add from '../../../Icons/generated/Add';
import CardDropdownMenuItem from '../CardDropdownMenuItem';
export const CardDropdownMenuItemCreate = React.forwardRef(({ createText, onClick, disabled = false, testId }) => {
    return (_jsxs(CardDropdownMenuItem, { onClick: onClick, "data-cyid": `${testId}-menu-action`, disabled: disabled, sx: (theme) => ({
            color: theme.palette.primary.main,
            alignItems: 'center',
        }), children: [_jsx(Box, { sx: (theme) => ({
                    marginRight: theme.spacing(1),
                    fontSize: theme.spacing(1.5),
                    alignItems: 'center',
                    display: 'flex',
                }), className: "createIcon", children: _jsx(Add, { fontSize: "inherit" }) }), _jsx(Box, { className: "createText", children: createText })] }));
});
CardDropdownMenuItemCreate.displayName = 'CardDropdownMenuItemCreate';
//# sourceMappingURL=CardDropdownMenuItemCreate.js.map