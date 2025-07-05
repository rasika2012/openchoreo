import { ListSubheaderProps as MUISelectSubHeaderProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
interface SelectMenuSubHeaderProps extends MUISelectSubHeaderProps {
    testId: string;
    theme?: Theme;
}
export declare const StyledSelectMenuSubHeader: React.ComponentType<SelectMenuSubHeaderProps>;
export {};
