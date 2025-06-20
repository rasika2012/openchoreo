import { ThemeProvider, Box } from "@open-choreo/design-system";
import { MainLayout } from "./layouts/MainLayout";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { pluginRegistry } from "./plugins";
import { PluginExtensionType } from "@open-choreo/plugin-core";

const pages = pluginRegistry.flatMap(plugin => plugin.extensions.filter(entry => entry.type === PluginExtensionType.PAGE).map(entry => ({
  path: entry.path,
  element: <entry.component />,
})));

export default function App() {
  useEffect(() => {
    console.log(pages, "pages");
  }, []);
  return (
    <ThemeProvider mode="light">
      <Box width="100vw" height="100vh">
        <MainLayout>
          <Routes>
            {
              pages.map((page) => (
                <Route key={page.path} path={page.path + "/:subpath"} element={page.element} />
              ))
            }
          </Routes>
        </MainLayout>
      </Box>
    </ThemeProvider>
  );
}
