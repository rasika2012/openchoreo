import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router";
import { useRouteExtentions } from "../../hooks";
import { PresetErrorPage } from "@open-choreo/common-views";
export function RouteExtensionMounter(props) {
    const { extentionPoint } = props;
    const pageEntriesOrgLevel = useRouteExtentions(extentionPoint);
    return (_jsxs(Routes, { children: [pageEntriesOrgLevel.map(({ pathPattern, component: Component }) => (_jsx(Route, { path: pathPattern, element: _jsx(Component, {}) }, pathPattern))), _jsx(Route, { path: "*", element: _jsx(PresetErrorPage, { preset: "404" }) })] }));
}
//# sourceMappingURL=RouteExtensionMounter.js.map