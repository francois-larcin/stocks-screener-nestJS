import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../../components/Form";
import { API_URL } from "../../config/api";
import { Input } from "../../components/Input";
import { ImagePerso } from "../../components/Image";
import wallPaper from "../../assets/images/wallPaper.png";

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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    navigate("/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <ImagePerso
        src={wallPaper}
        alt="Fond d'écran"
        opacity={0.5}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-[0.97]"
      />
      <div className="z-10 w-full max-w-md px-6">
        <Form
          title="Créer un compte"
          onSubmit={handleRegister}
          submitLabel="S'inscrire"
          submitColor="bull"
        >
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
        </Form>
      </div>
    </div>
  );
}
