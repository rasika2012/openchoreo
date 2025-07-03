import { ThemeProvider, Box, Level } from "@open-choreo/design-system";
import { Suspense } from "react";
import { defaultPath, ExtentionProviderMounter, PageExtentionsMounter, PathsPatterns } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { PresetErrorPage, FullPageLoader } from "@open-choreo/common-views";


// Lazy load the MainLayout component
const MainLayout = React.lazy(() => import("./layouts/MainLayout").then(module => ({ default: module.MainLayout })));

export default function App() {
  // TODO: Add a proper suspence fallback
  return (
    <ThemeProvider mode="light">
      <IntlProvider locale="en">
        <ExtentionProviderMounter extentionPointId="global" >
          <Box width="100vw" height="100vh">
            <Suspense fallback={<FullPageLoader />}>
              <MainLayout>
                <Routes>
                  <Route path={PathsPatterns.COMPONENT_LEVEL} element={<PageExtentionsMounter extentionPointId={Level.COMPONENT} />} />
                  <Route path={PathsPatterns.PROJECT_LEVEL} element={<PageExtentionsMounter extentionPointId={Level.PROJECT} />} />
                  <Route path={PathsPatterns.ORG_LEVEL} element={<PageExtentionsMounter extentionPointId={Level.ORGANIZATION} />} />
                  <Route path="/" element={<Navigate to={defaultPath} />} />
                  <Route path={"/*"} element={<PageExtentionsMounter extentionPointId="global" />} />
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
