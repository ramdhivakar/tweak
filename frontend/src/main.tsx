import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { CaseProvider } from "./features/case/context/CaseContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CaseProvider>
      <App />
    </CaseProvider>
  </React.StrictMode>,
);
