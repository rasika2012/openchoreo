import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback } from "react";
import { useExtentionProviders } from "../../hooks/useProviderExtentions";
export function WrapperExtensionMounter(props) {
    const { extentionPoint, children } = props;
    const extentions = useExtentionProviders(extentionPoint);
    // Create nested providers by reducing the extensions array
    const nestedProviders = useCallback(() => {
        return extentions.reduceRight((acc, extension) => {
            const ProviderComponent = extension.component;
            return _jsx(ProviderComponent, { children: acc }, extension.key);
        }, children);
    }, [extentions, children]);
    return _jsx(_Fragment, { children: nestedProviders() });
}
//# sourceMappingURL=WrapperExtensionMounter.js.map