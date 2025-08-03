import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard"; // 👈 Import du dashboard
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Page après connexion */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* 404 */}
        <Route path="*" element={<h1>Page non trouvée 😢</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
