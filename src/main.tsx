import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Lấy basename từ môi trường (nếu không có thì mặc định là "/")
const basename = import.meta.env.BASE_URL || "/";

// Kiểm tra element root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Please ensure there is a <div id='root'> in your index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);