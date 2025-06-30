import { ThemeProvider, Box } from "@open-choreo/design-system";
import { MainLayout } from "./layouts/MainLayout";
import { useEffect } from "react";
import { useRouteExtentions, ExtentionProviderMounter } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";

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
            <MainLayout>
              {pages}
            </MainLayout>
          </Box>
        </ExtentionProviderMounter>
      </IntlProvider>
    </ThemeProvider>
  );
}
