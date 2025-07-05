import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useMediaQuery as useMuiMediaQuery } from '@mui/material';
export function useMediaQuery(query, side = 'up') {
    const theme = useMuiTheme();
    return useMuiMediaQuery(theme.breakpoints[side](query));
}
export function useChoreoTheme() {
    const theme = useMuiTheme();
    return {
        pallet: theme.palette,
        shadows: theme.shadows,
        typography: theme.typography,
        zIndex: theme.zIndex,
        breakpoints: theme.breakpoints,
        components: theme.components,
        transitions: theme.transitions,
        spacing: theme.spacing,
        shape: theme.shape,
    };
}
//# sourceMappingURL=useTheme.js.map