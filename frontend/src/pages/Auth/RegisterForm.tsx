import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useState } from "react";

import { API_URL } from "../../config/api";
import { Input } from "../../components/Input";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    //? Call API

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      navigate("/dashboard");
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl mb-4">Créer un compte</h1>

      <Input
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Email"
        required
      />
      <Input
        type="username"
        value={username}
        onChange={setUsername}
        placeholder="Nom d'utilisateur"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Mot de passe"
        required
      />

      <Button label="Valider" color="green" onClick={handleRegister} />
    </div>
  );
}
