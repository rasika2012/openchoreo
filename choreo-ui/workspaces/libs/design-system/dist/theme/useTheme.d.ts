import { Theme } from '@mui/material/styles';
export declare function useMediaQuery(query: number | 'lg' | 'md' | 'sm', side?: 'up' | 'down'): boolean;
export declare function useChoreoTheme(): {
    pallet: Theme['palette'];
    shadows: Theme['shadows'];
    typography: Theme['typography'];
    zIndex: Theme['zIndex'];
    breakpoints: Theme['breakpoints'];
    components: Theme['components'];
    transitions: Theme['transitions'];
    spacing: Theme['spacing'];
    shape: Theme['shape'];
};
