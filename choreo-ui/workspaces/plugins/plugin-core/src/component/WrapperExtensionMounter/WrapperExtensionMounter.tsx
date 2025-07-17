import React, { useCallback } from "react";
import { useExtentionProviders } from "../../hooks/useProviderExtentions";
import { PluginExtensionPoint } from "../../plugin-types";

export interface WrapperExtensionMounterProps {
  extensionPoint: PluginExtensionPoint;
  children: React.ReactNode;
}

export function WrapperExtensionMounter(props: WrapperExtensionMounterProps) {
  const { extensionPoint, children } = props;
  const extentions = useExtentionProviders(extensionPoint);
  // Create nested providers by reducing the extensions array
  const nestedProviders = useCallback(() => {
    return extentions.reduceRight((acc, extension) => {
      const ProviderComponent = extension.component;
      return <ProviderComponent key={extension.key}>{acc}</ProviderComponent>;
    }, children);
  }, [extentions, children]);

  return <>{nestedProviders()}</>;
}
