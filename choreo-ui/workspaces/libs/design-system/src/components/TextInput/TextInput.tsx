import React from 'react';
import {
  Box,
  CircularProgress,
  FormHelperText,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { QuestionIcon, InfoIcon } from '@design-system/Icons';
import {
  StyledTextField,
  StyledFormControl,
  HeadingWrapper,
} from './TextInput.styled';
import Question from '@design-system/Icons/generated/Question';

export interface TextInputProps {
  label?: string;
  value: string;
  optional?: boolean;
  loading?: boolean;
  tooltip?: React.ReactNode;
  info?: React.ReactNode;
  tooltipPlacement?: TooltipProps['placement'];
  inputTooltip?: React.ReactNode;
  typography?: React.ComponentProps<typeof Typography>['variant'];
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  testId: string;
  onChange: (text: string) => void;
  disabled?: boolean;
  type?: string;
  readonly?: boolean;
  actions?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  rounded?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  placeholder?: string;
  endAdornment?: React.ReactNode;
  InputProps?: React.ComponentProps<typeof StyledTextField>['InputProps'];
}

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      label,
      tooltip,
      value,
      error,
      errorMessage,
      testId,
      onChange,
      disabled,
      readonly,
      multiline = false,
      className,
      rows,
      optional,
      loading,
      info,
      actions,
      helperText,
      rounded = true,
      size = 'small',
      fullWidth = false,
      type,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const computedError = !!errorMessage || !!error;

    const toolTip = tooltip && (
      <Tooltip title={tooltip} placement={props.tooltipPlacement}>
        <Box className="tooltipIcon">
          <Box className="textInputInfoIcon">
            <Question fontSize="inherit" />
          </Box>
        </Box>
      </Tooltip>
    );

    return (
      <StyledFormControl ref={ref} className={className}>
        {(label || toolTip || info || optional || actions) && (
          <HeadingWrapper>
            <Typography>{label}</Typography>
            {tooltip && (
              <Tooltip title={tooltip} className="formLabelTooltip">
                <QuestionIcon fontSize="inherit" className="tooltipIcon" />
              </Tooltip>
            )}
            {info && <Box className="formLabelInfo">{info}</Box>}
            {optional && (
              <Typography variant="body2" className="formOptional">
                (Optional)
              </Typography>
            )}
            {actions && <Box className="formLabelAction">{actions}</Box>}
          </HeadingWrapper>
        )}
        <StyledTextField
          customSize={size}
          data-cyid={testId}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          type={type}
          value={value}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            onChange(evt.target.value)
          }
          disabled={disabled}
          slotProps={{
            input: {
              readOnly: readonly,
            },
            inputLabel: {
              shrink: false,
            },
          }}
          InputProps={{
            ...(props.InputProps || {}),
            endAdornment: endAdornment ?? props.InputProps?.endAdornment,
          }}
          error={computedError}
          helperText={
            computedError && errorMessage ? (
              <Box display="flex" alignItems="center" gap={0.5}>
                <InfoIcon fontSize="inherit" />
                {errorMessage}
              </Box>
            ) : (
              helperText
            )
          }
          fullWidth={fullWidth}
          {...props}
        />
        {loading && helperText && (
          <FormHelperText>
            <Box display="flex" alignItems="center">
              <CircularProgress size={12} />
              <Box ml={1}>{helperText}</Box>
            </Box>
          </FormHelperText>
        )}
      </StyledFormControl>
    );
  }
);

TextInput.displayName = 'TextInput';
