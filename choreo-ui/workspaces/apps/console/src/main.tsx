import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { PluginProvider } from "@open-choreo/plugin-core";
import { getPluginRegistry } from "./plugins/index.ts";
import App from "./App.tsx";

async function initializeApp() {
  const pluginRegistry = await getPluginRegistry();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <PluginProvider pluginRegistry={pluginRegistry}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </PluginProvider>
    </StrictMode>,
  );
}

// Initialize the app
initializeApp().catch(console.error);
