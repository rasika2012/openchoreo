import { jsx as _jsx } from "react/jsx-runtime";
import { createTheme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import defaultTheme from './theme.json';
import React from 'react';
import '../fonts/fonts.css';
import './initialLoader.css';
export function ThemeProvider(props) {
    const { children, mode = 'light', customPalette } = props;
    const darkTheme = React.useMemo(() => {
        const typography = {
            ...defaultTheme.typography,
            overline: {
                ...defaultTheme.typography.overline,
                textTransform: 'none',
            },
        };
        return createTheme({
            typography,
            zIndex: defaultTheme.zIndex,
            palette: {
                ...defaultTheme.colorSchemes.dark.palette,
                ...customPalette?.dark,
                mode: 'dark',
            },
            shadows: defaultTheme.dark.shadows,
        });
    }, [customPalette]);
    const lightTheme = React.useMemo(() => {
        const typography = {
            ...defaultTheme.typography,
            overline: {
                ...defaultTheme.typography.overline,
                textTransform: 'none',
            },
        };
        return createTheme({
            typography,
            zIndex: defaultTheme.zIndex,
            palette: {
                ...defaultTheme.colorSchemes.light.palette,
                ...customPalette?.light,
                mode: 'light',
            },
            shadows: defaultTheme.light.shadows,
        });
    }, [customPalette]);
    return (_jsx(MuiThemeProvider, { theme: mode === 'dark' ? darkTheme : lightTheme, children: children }));
}
//# sourceMappingURL=ThemeProvider.js.map