import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { API_URL } from "../../config/api";
import { Form } from "../../components/Form";
import { ImagePerso } from "../../components/Image";
import logo from "../../assets/images/wallPaper.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credentials, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    navigate("/dashboard"); // ✅ Redirection après connexion
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <ImagePerso
        src={logo}
        alt="Fond d'écran"
        opacity={0.5}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-[0.97]"
      />

      <div className="z-10 w-full max-w-md px-6">
        <Form
          title="Connexion"
          onSubmit={handleLogin}
          submitLabel="Se connecter"
          submitColor="bull"
        >
          <Input
            type="credentials"
            value={credentials}
            onChange={setCredentials}
            placeholder="Email ou nom d'utilisateur"
            required
          />

          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Mot de passe"
            required
          />
        </Form>
      </div>
    </div>
  );
}
