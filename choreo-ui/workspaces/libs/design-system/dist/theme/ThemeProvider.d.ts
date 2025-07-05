import { PaletteOptions } from '@mui/material';
import React from 'react';
import '../fonts/fonts.css';
import './initialLoader.css';
export interface ThemeProviderProps {
    children: React.ReactNode;
    mode?: 'light' | 'dark';
    customPalette?: {
        dark: PaletteOptions;
        light: PaletteOptions;
    };
}
export declare function ThemeProvider(props: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
