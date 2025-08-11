import { Navigate, Outlet, useLocation } from "react-router";
import { isJwtValid } from "../utils/jwt";

export default function RequireAuth() {
  const token = localStorage.getItem("token");
  const ok = isJwtValid(token);
  const loc = useLocation();

  return ok ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: loc }} />
  );
}
