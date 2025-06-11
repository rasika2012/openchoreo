import {
  ThemeProvider,
  Box,
  MenuHomeIcon,
  MenuHomeFilledIcon,
  MenuProjectIcon,
  MenuProjectFilledIcon,
} from "@open-choreo/design-system";
import { MainLayout, type MainMenuItem } from "@open-choreo/common-views";
import { useState } from "react";


const mockMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: <MenuHomeIcon fontSize="inherit" />,
    filledIcon: <MenuHomeFilledIcon fontSize="inherit" />,
    path: "/home",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <MenuProjectIcon fontSize="inherit" />,
    filledIcon: <MenuProjectFilledIcon fontSize="inherit" />,
    path: "/projects",
  },
];
export default function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MainMenuItem>(
    mockMenuItems[0],
  );
  return (
    <ThemeProvider mode="light">
      <Box width="100vw" height="100vh">
        <MainLayout
          footer={<Box>Footer</Box>}
          header={<Box>Header</Box>}
          menuItems={mockMenuItems}
          rightSidebar={<Box>Right Sidebar</Box>}
          selectedMenuItem={selectedMenuItem}
          onMenuItemClick={setSelectedMenuItem}
        >
          <Box>
            Content will be here
          </Box>
        </MainLayout>
      </Box>
    </ThemeProvider>
  );
}
