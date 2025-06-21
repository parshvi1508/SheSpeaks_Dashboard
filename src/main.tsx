import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for createRoot
import App from "./App";
import "/src/index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);