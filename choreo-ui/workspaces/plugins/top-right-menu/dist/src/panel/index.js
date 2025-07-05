import { coreExtensionPoints, } from "@open-choreo/plugin-core";
import React from "react";
const TopRightMenuPanel = React.lazy(() => import("./TopRightMenuPanel"));
export const panel = {
    extentionPoint: coreExtensionPoints.headerRight,
    key: "toprightmenu",
    component: TopRightMenuPanel,
};
//# sourceMappingURL=index.js.map