import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ReactFlowProvider } from "reactflow";
import "./index.css";
import "reactflow/dist/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
