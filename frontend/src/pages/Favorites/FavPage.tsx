// src/pages/Favorites/IndexPage.tsx
import { ConfirmButton } from "../../components/ConfirmButton";
import { useFavLists } from "../../hooks/favorites/useFavLists";

export default function FavoritesIndexPage() {
  const { lists, loading, clearList, deleteList } = useFavLists();

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
              className="flex items-center justify-between bg-white rounded-full shadow p-3"
            >
              {/* Nom de la liste */}
              <span className="font-medium">{l.name}</span>

              {/* Actions à droite */}
              <div className="flex gap-2">
                <ConfirmButton
                  label="Vider"
                  color="yellow"
                  onConfirm={() => clearList(l.id)}
                  title={""}
                />
                <ConfirmButton
                  label="Supprimer"
                  color="red"
                  size="sm"
                  message="Supprimer définitivement ?"
                  onConfirm={() => deleteList(l.id)} title={""}                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
