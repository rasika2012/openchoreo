import { ThemeProvider, Box } from "@open-choreo/design-system";
import { Suspense } from "react";
import { ExtentionProviderMounter, PageExtentionsMounter, PathsPatterns, rootExtensionPoints } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import React from "react";
import { Route, Routes } from "react-router";
import { PresetErrorPage, FullPageLoader } from "@open-choreo/common-views";


// Lazy load the MainLayout component
const MainLayout = React.lazy(() => import("./layouts/MainLayout").then(module => ({ default: module.MainLayout })));

export default function App() {
  // TODO: Add a proper suspence fallback
  return (
    <ThemeProvider mode="light">
      <IntlProvider locale="en">
        <ExtentionProviderMounter extentionPoint={rootExtensionPoints.globalProvider} >
          <Box width="100vw" height="100vh">
            <Suspense fallback={<FullPageLoader />}>
              <MainLayout>
                <Routes>
                  <Route path={PathsPatterns.COMPONENT_LEVEL} element={<PageExtentionsMounter extentionPoint={rootExtensionPoints.componentLevelPage} />} />
                  <Route path={PathsPatterns.PROJECT_LEVEL} element={<PageExtentionsMounter extentionPoint={rootExtensionPoints.projectLevelPage} />} />
                  <Route path={PathsPatterns.ORG_LEVEL} element={<PageExtentionsMounter extentionPoint={rootExtensionPoints.orgLevelPage} />} />
                  <Route path={"/*"} element={<PageExtentionsMounter extentionPoint={rootExtensionPoints.globalPage}/>} />
                  <Route path="*" element={<PresetErrorPage preset="404" />} />
                </Routes>
              </MainLayout>
            </Suspense>
          </Box>
        </ExtentionProviderMounter>
      </IntlProvider>
    </ThemeProvider>
  );
}
