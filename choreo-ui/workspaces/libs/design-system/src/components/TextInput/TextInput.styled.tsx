import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import type { TextFieldProps } from '@mui/material/TextField';
import type { FormControlProps } from '@mui/material/FormControl';
import { StyledComponent } from '@emotion/styled';
import { alpha } from '@mui/material';

export const StyledTextField: StyledComponent<TextFieldProps> = styled(
  TextField
)(({ theme }) => ({
  borderRadius: theme.spacing(0.625),
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[20],
    borderRadius: theme.shape.borderRadius,
    border: 0,
    '&:active, &:focus': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[21],
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[21],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
      backgroundColor: 'transparent !important',
    },
    '&.Mui-error': {
      backgroundColor: alpha(theme.palette.error.main, 0.05),
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[22],
    },
  },

  '& .MuiFormHelperText-root.Mui-error': {
    margin: 0,
    marginTop: theme.spacing(1),
    color: theme.palette.error.main,
    fontSize: theme.typography.caption.fontSize,
  },
}));

export const StyledFormControl: StyledComponent<FormControlProps> = styled(
  FormControl
)({
  width: '100%',
});

export const HeadingWrapper: StyledComponent<any> = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: `${theme.spacing(0.625)} 0`,
  })
);
