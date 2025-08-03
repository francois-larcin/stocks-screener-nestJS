import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useState } from "react";
import { Input } from "../../components/input";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Nouvelle inscription :", email, username, password);

    navigate("/dashboard");
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
