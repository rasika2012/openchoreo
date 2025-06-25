import { ThemeProvider, Box } from "@open-choreo/design-system";
import { MainLayout } from "./layouts/MainLayout";
import { useEffect } from "react";
import { pluginRegistry } from "./plugins";
import { useRouteExtentions } from "@open-choreo/plugin-core";

export default function App() {
  const pages = useRouteExtentions(pluginRegistry);
  useEffect(() => {
    console.log(pages, "pages");
  }, []);
  return (
    <ThemeProvider mode="light">
      <Box width="100vw" height="100vh">
        <MainLayout>
          {pages}
        </MainLayout>
      </Box>
    </ThemeProvider>
  );
}
