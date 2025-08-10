import { useNavigate } from "react-router";
import { ConfirmButton } from "../components/ConfirmButton";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //? Nettoyer la session côté front
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur votre Dashboard 🎉</h1>
      <p className="mt-4 text-gray-600">Voici un aperçu de votre activité.</p>

      <ConfirmButton
        label="Se déconnecter"
        color="red"
        title="Confirmer la déconnexion ?"
        message="Vous serez redirigé vers la page d’accueil."
        onConfirm={handleLogout}
      />
    </div>
  );
}
