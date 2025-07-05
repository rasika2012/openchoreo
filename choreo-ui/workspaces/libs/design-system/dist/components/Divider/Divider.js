import { jsx as _jsx } from "react/jsx-runtime";
import { Divider as MuiDivider } from '@mui/material';
/**
 * Divider component
 * @component
 */
export function Divider(props) {
    const { testId, variant = 'fullWidth', orientation = 'horizontal' } = props;
    return (_jsx(MuiDivider, { "data-testid": testId, variant: variant, orientation: orientation }));
}
Divider.displayName = 'Divider';
//# sourceMappingURL=Divider.js.map