import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { PluginProvider } from "@open-choreo/plugin-core";
import { pluginRegistry } from "./plugins/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PluginProvider pluginRegistry={pluginRegistry}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </PluginProvider>
  </StrictMode>,
);
