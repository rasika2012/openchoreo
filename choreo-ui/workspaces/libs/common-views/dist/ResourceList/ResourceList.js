import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardActionArea, CardContent, ImageMenuProjectColored, Tooltip, Typography, NoDataMessage, } from '@open-choreo/design-system';
import { useNavigate } from 'react-router';
export function ResourceList(props) {
    var _a = props.resources, resources = _a === void 0 ? [] : _a, _b = props.cardWidth, cardWidth = _b === void 0 ? 320 : _b;
    var navigate = useNavigate();
    var handleResourceClick = function (resource) {
        navigate(resource.href || '');
    };
    return (_jsx(Box, { padding: 2, children: _jsx("div", { style: {
                flexWrap: 'wrap',
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
            }, children: (resources === null || resources === void 0 ? void 0 : resources.length) > 0 ? (resources === null || resources === void 0 ? void 0 : resources.map(function (resource) { return (_jsx(Card, { testId: resource.id, boxShadow: "dark", style: { width: cardWidth }, onClick: function () { return handleResourceClick(resource); }, children: _jsx(CardActionArea, { testId: resource.id, children: _jsxs(CardContent, { paddingSize: "md", children: [_jsxs(Box, { display: "flex", alignItems: "center", gap: 16, margin: "0 0 16px 0", children: [_jsx(Box, { flexGrow: 0, width: 48, height: 48, display: "flex", justifyContent: "center", alignItems: "center", overflow: "visible", children: _jsx(ImageMenuProjectColored, { width: 48, height: 48 }) }), _jsxs(Box, { width: "calc(100% - 64px)", overflow: "hidden", children: [_jsx("div", { style: {
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    marginBottom: '4px',
                                                }, children: _jsx(Typography, { variant: "h6", children: _jsx(Tooltip, { placement: "right", title: resource.name, children: resource.name }) }) }), _jsx("div", { style: {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    lineHeight: '1.2em',
                                                    height: '2.4em',
                                                }, children: resource.description ? (_jsx(Typography, { variant: "body2", children: resource.description })) : (_jsx(Typography, { variant: "body2", color: "text.secondary", children: "No description available." })) })] })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", color: "text.secondary", overflow: "hidden", width: "100%", children: [_jsx("div", { style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '60%',
                                        }, children: props.footerResourceListCardLeft }), _jsx(Box, { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, children: props.footerResourceListCardRight })] })] }) }) }, resource.id)); })) : (_jsx(NoDataMessage, {})) }) }));
}
//# sourceMappingURL=ResourceList.js.map