import { useState } from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

export default function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); //? email ou username
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Tentative de connexion avec", identifier, password);

    navigate("/dashboard"); // ✅ Redirection après connexion
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl mb-4">Connexion</h1>

      <Input
        type="credentials"
        value={identifier}
        onChange={setIdentifier}
        placeholder="Email ou nom d'utilisateur"
        required
      />

      <Input
        type="credentials"
        value={password}
        onChange={setPassword}
        placeholder="Mot de passe"
        required
      />

      <Button label="Se connecter" color="blue" onClick={handleLogin} />
    </div>
  );
}
