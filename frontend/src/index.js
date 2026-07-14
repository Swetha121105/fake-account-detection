import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { PredictionProvider } from "./context/PredictionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PredictionProvider>
      <App />
  </PredictionProvider>
);