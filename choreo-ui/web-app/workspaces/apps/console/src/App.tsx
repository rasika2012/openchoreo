import { ThemeProvider, Box } from "@open-choreo/design-system";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  return (
    <ThemeProvider mode="light">
      <Box width="100vw" height="100vh">
        <MainLayout>
          <Box>
            Content will be here
          </Box>
        </MainLayout>
      </Box>
    </ThemeProvider>
  );
}
