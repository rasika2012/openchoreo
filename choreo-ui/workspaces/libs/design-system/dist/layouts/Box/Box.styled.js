import styled from '@emotion/styled';
import { Box } from '@mui/material';
function getBorder(border) {
    if (border === 'small') {
        return '0.5px solid';
    }
    if (border === 'medium') {
        return '1px solid';
    }
    return border;
}
export const StyledBox = styled(Box)(({ transition, backgroundColor, height, width, display, flexDirection, overflow, padding, margin, border, borderRadius, boxShadow, cursor, color, minHeight, maxHeight, minWidth, maxWidth, flexGrow, position, borderColor, borderBottom, borderTop, borderLeft, borderRight, gap, justifyContent, alignItems, zIndex, }) => ({
    transition: transition,
    backgroundColor: backgroundColor,
    height: height,
    width: width,
    display: display,
    flexDirection: flexDirection,
    overflow: overflow,
    padding: padding,
    margin: margin,
    border: getBorder(border),
    borderBottom: getBorder(borderBottom),
    borderTop: getBorder(borderTop),
    borderLeft: getBorder(borderLeft),
    borderRight: getBorder(borderRight),
    borderColor: borderColor,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    cursor: cursor,
    color: color,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth,
    maxWidth: maxWidth,
    flexGrow: flexGrow,
    position: position,
    gap: gap,
    justifyContent: justifyContent,
    alignItems: alignItems,
    zIndex: zIndex,
}));
//# sourceMappingURL=Box.styled.js.map