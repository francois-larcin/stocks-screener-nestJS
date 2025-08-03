import { Button } from "../components";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl font-bold">Bienvenue sur ScreenerJs</h1>

      <Button
        label="Se connecter"
        color="blue"
        onClick={() => navigate("/login")}
      />
      <Button
        label="Pas encore de compte ?"
        color="yellow"
        onClick={() => navigate("/register")}
      />
    </div>
  );
}
