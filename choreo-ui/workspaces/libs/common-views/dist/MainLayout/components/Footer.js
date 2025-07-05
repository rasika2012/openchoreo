import { jsx as _jsx } from "react/jsx-runtime";
import { useChoreoTheme, Box } from '@open-choreo/design-system';
import React from 'react';
export var Footer = React.forwardRef(function (_a, ref) {
    var children = _a.children;
    var theme = useChoreoTheme();
    return (_jsx(Box, { ref: ref, height: theme.spacing(5.5), borderTop: "small", borderColor: theme.pallet.grey[200], children: children }));
});
Footer.displayName = 'Footer';
//# sourceMappingURL=Footer.js.map