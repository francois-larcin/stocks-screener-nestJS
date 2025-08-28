import { useNavigate } from "react-router";
import { ConfirmButton } from "../components/ConfirmButton";
import { useProfile } from "../hooks/user/useProfile";
import { Button } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardPage() {
  const { user, loading } = useProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    //? Nettoyer la session côté front
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Non connecté</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur votre Dashboard 🎉</h1>
      <p className="mt-4 text-gray-600">Voici un aperçu de votre activité.</p>

      {/* Raccourcis vers les Favoris */}
      <div className="flex gap-3">
        <Button
          label={
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={["far", "heart"]} />
              Mes favoris
            </span>
          }
          to="/favorites"
          color="blue"
        />
        {/* Si tu veux un exemple direct vers une liste précise (remplace :id) */}
        {/* <Button label="Ouvrir la liste #1" to="/favorites/1" color="yellow" /> */}
      </div>

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
