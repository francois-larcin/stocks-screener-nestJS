import { useState } from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage(`${error.message}`);
        return;
      }

      setMessage("Inscription réussie");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch {
      setMessage("Erreur survenue");
    }
  };

  return (
    <>
      <Button label="Accueil" color="yellow" onClick={() => navigate("/")} />
      <form onSubmit={handleRegister}>
        <h2 className="text-xl font-bold text-center text-blue-100">
          Inscription
        </h2>

        <input
          type="email"
          placeholder="votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          placeholder="votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          placeholder="votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <Button label="S'inscrire" color="red" />

        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </>
  );
}
