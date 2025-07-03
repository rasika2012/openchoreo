import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { PluginProvider } from "@open-choreo/plugin-core";
import { getPluginRegistry } from "./plugins/index.ts";
import React from "react";
import { FullPageLoader } from "@open-choreo/common-views";

// Lazy load the App component
const App = React.lazy(() => import("./App.tsx"));

// Async function to initialize the app
async function initializeApp() {
  const pluginRegistry = await getPluginRegistry();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <PluginProvider pluginRegistry={pluginRegistry}>
        <BrowserRouter basename="/">
          <Suspense fallback={<FullPageLoader />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </PluginProvider>
    </StrictMode>,
  );
}

// Initialize the app
initializeApp().catch(console.error);
