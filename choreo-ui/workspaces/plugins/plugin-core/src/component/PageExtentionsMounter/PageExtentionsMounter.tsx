import React, { useMemo } from "react";
import { PluginExtensionPage, PluginExtensionType } from "../../plugin-types";
import { Navigate, Route, Routes } from "react-router";
import { usePluginRegistry } from "../../Providers";
import { PresetErrorPage } from "@open-choreo/common-views";

interface PageExtentionsMounterProps {
  extentionPointId: string;
}

export function PageExtentionsMounter(props: PageExtentionsMounterProps) {
  const { extentionPointId } = props;
  const pluginRegistry = usePluginRegistry();

  const routes = useMemo(() => {
    const pageEntriesOrgLevel = pluginRegistry.flatMap((plugin) =>
      plugin.extensions
        .filter((entry) => entry.type === PluginExtensionType.PAGE && entry.extentionPointId === extentionPointId)
        .map((entry: PluginExtensionPage) => ({
          path: entry.pathPattern,
          element: <entry.component />,
        })),
    );

    return (
      <Routes>
        {pageEntriesOrgLevel.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        )
        )}
        <Route path="*" element={<PresetErrorPage preset="404" />} />
      </Routes>
    );
  }, [pluginRegistry, extentionPointId]);

  return routes;
}
