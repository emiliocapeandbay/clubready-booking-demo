import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'; // Import Tailwind CSS
import Tabs from "./pages/Tabs"; // Import Tabs component
import { TabProvider } from "./pages/TabContext"; // Import TabProvider

const container = document.getElementById("app");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <TabProvider>
      <Tabs />
    </TabProvider>
  </BrowserRouter>,
);