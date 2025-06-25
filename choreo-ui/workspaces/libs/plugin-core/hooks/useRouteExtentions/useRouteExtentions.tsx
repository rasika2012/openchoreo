import React, { useMemo } from "react";
import { PluginExtensionType, PluginManifest } from "../..";
import { Route, Routes } from "react-router";

export function useRouteExtentions(pluginRegistry: PluginManifest[]) {

  const routes = useMemo(() => {
    const pageEntries = pluginRegistry.flatMap(plugin =>
      plugin.extensions.filter(entry => entry.type === PluginExtensionType.PAGE).map(entry => ({
        path: entry.path,
        element: <entry.component />,
      }))
    );

    return (
      <Routes>
        {
          pageEntries.map((page) => (
            <Route key={page.path} path={page.path + "/:subpath"} element={page.element} />
          ))
        }
      </Routes>
    );
  }, [pluginRegistry]);

  return routes;
}