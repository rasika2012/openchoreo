import { coreExtensionPoints, } from "@open-choreo/plugin-core";
import ApiClientProvider from "./ApiClientProvider";
export const provider = {
    extentionPoint: coreExtensionPoints.globalProvider,
    key: "choreo-context",
    component: ApiClientProvider,
};
//# sourceMappingURL=index.js.map