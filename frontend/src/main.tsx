import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Auth/Register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Page non trouvée 😢</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
