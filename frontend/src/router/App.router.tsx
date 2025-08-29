// src/App.router.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginForm from "../pages/Auth/LoginForm";
import RegisterForm from "../pages/Auth/RegisterForm";
import RequireAuth from "./RequireAuth";
import DashboardPage from "../pages/Dashboard";
import FavPage from "../pages/Favorites/FavPage";
import FavDetailPage from "../pages/Favorites/FavDetailPage";
import AppLayout from "../components/layout/Layout.Navbar";
import Backtest from "../pages/BackTest/Backtest";
import Dividends from "../pages/Dividends/Dividends";

export default function AppRouter() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Pages protégées */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/favorites" element={<FavPage />}></Route>
          <Route path="/favorites/:id" element={<FavDetailPage />}></Route>
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/dividends" element={<Dividends />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Page non trouvée 😢</h1>} />
    </Routes>
  );
}
