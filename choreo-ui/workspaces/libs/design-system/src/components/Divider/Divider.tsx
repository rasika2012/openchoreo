import { Divider as MuiDivider } from '@mui/material';

export interface DividerProps {
  testId?: string;
  variant?: 'fullWidth' | 'inset' | 'middle';
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Divider component
 * @component
 */
export function Divider(props: DividerProps) {
    const { testId, variant = 'fullWidth', orientation = 'horizontal' } = props;
    return (
     <MuiDivider data-testid={testId} variant={variant} orientation={orientation}   />
    );
}


Divider.displayName = 'Divider';
