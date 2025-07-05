import { jsx as _jsx } from "react/jsx-runtime";
import { Box, ImageBuilding } from '@open-choreo/design-system';
export function FullPageLoader(props) {
    var _a = props.relative, relative = _a === void 0 ? false : _a;
    return (_jsx(Box, { testId: "full-page-loader", display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', position: relative ? 'relative' : 'absolute', children: _jsx(ImageBuilding, {}) }));
}
//# sourceMappingURL=FullPageLoader.js.map