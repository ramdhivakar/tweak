import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { CaseProvider } from "./features/case/context/CaseContext";
import { TemplateProvider } from "./features/templates/context/TemplateContext";
import { EditorProvider } from "./features/editor/context/EditorContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
<CaseProvider>
  <TemplateProvider>
    <EditorProvider>
      <App />
    </EditorProvider>
  </TemplateProvider>
</CaseProvider>
  </React.StrictMode>,
);
