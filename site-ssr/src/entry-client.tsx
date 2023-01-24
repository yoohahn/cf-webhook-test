import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ThemeProvider } from "./ThemeProvider";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const FullApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container);
  root.render(<FullApp />);
} else {
  hydrateRoot(container, <FullApp />);
}
