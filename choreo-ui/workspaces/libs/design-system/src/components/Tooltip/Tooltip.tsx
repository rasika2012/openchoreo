import React from 'react';
import { StyledTooltip } from './Tooltip.styled';
import { Box, Divider, Typography, Tooltip as MuiTooltip } from '@mui/material';

export type tooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Additional className for the component
   */
  className?: string;
  /**
   * arrow to the tooltip
   */
  arrow?: boolean;
  /**
   * placement of the tooltip
   */
  placement?: tooltipPlacement;
  /**
   * title of the tooltip
   */
  title?: string;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  /**
   * content of the tooltip
   */
  content?: React.ReactNode;
  /**
   * example to be displayed in the tooltip
   */
  example?: React.ReactNode;
  /**
   * sx prop for styling
   */
  sx?: React.CSSProperties;
  /**
   * Additional props for the tooltip
   */
  [key: string]: any;
}

/**
 * Tooltip component
 * @component
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const infoTooltipFragment = (
      <Box p={0.5}>
        {props.title && (
          <Box mb={props.content ? 1 : 0}>
            <Typography variant="h5">{props.title}</Typography>
          </Box>
        )}
        {props.content && (
          <Box>
            <Typography variant="body2">{props.content}</Typography>
          </Box>
        )}
        {props.example && <Divider />}
        {props.example && (
          <Typography variant="body2">Eg: {props.example}</Typography>
        )}
      </Box>
    );

    if (!children) return null;

    return (
      <StyledTooltip
        ref={ref}
        className={className}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        arrow={props.arrow}
        placement={props.placement || 'bottom'}
        title={
          <MuiTooltip
            title={infoTooltipFragment}
            placement={props.placement || 'bottom'}
          >
            {infoTooltipFragment}
          </MuiTooltip>
        }
        {...props}
      >
        {React.isValidElement(children) ? (
          React.cloneElement(children, {
            ...props,
          })
        ) : (
          <span>{children}</span>
        )}
      </StyledTooltip>
    );
  }
);

Tooltip.displayName = 'Tooltip';
