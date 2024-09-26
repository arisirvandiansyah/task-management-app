import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
