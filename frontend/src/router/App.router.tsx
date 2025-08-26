// src/App.router.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import RequireAuth from "./RequireAuth";
import DashboardPage from "../pages/Dashboard";
import FavoritesPage from "../pages/FavoritesPage";


export default function AppRouter() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Pages protégées */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/favorites" element={<FavoritesPage/>}></Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Page non trouvée 😢</h1>} />
    </Routes>
  );
}
