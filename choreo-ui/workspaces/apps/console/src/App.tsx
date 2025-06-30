import { ThemeProvider, Box } from "@open-choreo/design-system";
import { useEffect, Suspense } from "react";
import { useRouteExtentions, ExtentionProviderMounter } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import React from "react";

// Lazy load the MainLayout component
const MainLayout = React.lazy(() => import("./layouts/MainLayout").then(module => ({ default: module.MainLayout })));

export default function App() {
  const pages = useRouteExtentions();
  useEffect(() => {
    console.log(pages, "pages");
  }, []);
  return (
    <ThemeProvider mode="light">
      <IntlProvider locale="en">
        <ExtentionProviderMounter extentionPointId="global" >
          <Box width="100vw" height="100vh">
            <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" height="100vh">Loading...</Box>}>
              <MainLayout>
                {pages}
              </MainLayout>
            </Suspense>
          </Box>
        </ExtentionProviderMounter>
      </IntlProvider>
    </ThemeProvider>
  );
}
