// src/pages/Favorites/IndexPage.tsx
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useFavLists } from "../../hooks/favorites/useFavLists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FavoritesIndexPage() {
  const { lists, loading, clearList, deleteList } = useFavLists();
  const navigate = useNavigate();

  if (loading) return <div>Chargement…</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Mes listes</h1>

      {lists.length === 0 ? (
        <p>Aucune liste.</p>
      ) : (
        <ul className="space-y-3">
          {lists.map((l) => (
            <li
              key={l.id}
              className="flex items-center justify-between bg-white rounded-full shadow p-3 cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/favorites/${l.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                navigate(`/favorites/${l.id}`)
              }
            >
              {/* Clic sur le libellé => navigation */}
              <span className="font-medium truncate">{l.name}</span>

              {/* Boutons à droite — on empêche la propagation pour ne PAS naviguer */}
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <ConfirmButton
                  label={<FontAwesomeIcon icon={["fas", "arrows-spin"]} />}
                  color="yellow"
                  message="Vider cette liste ?"
                  onConfirm={() => clearList(l.id)}
                  title={""}
                />
                <ConfirmButton
                  label={<FontAwesomeIcon icon={["fas", "trash-can"]} />}
                  color="red"
                  message="Supprimer définitivement ?"
                  onConfirm={() => deleteList(l.id)}
                  title={""}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
