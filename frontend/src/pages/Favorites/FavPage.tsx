import { Button } from "../../components";
import { useFavLists } from "../../hooks/favorites/useFavLists";

export default function FavoritesPage() {
  const { lists, loading, createList, clearList, deleteList } = useFavLists();

  if (loading) return <div>Chargement…</div>;

  return (
    <div>
      <h1>Mes listes</h1>
      <Button label="Créer une liste" onClick={() => createList()} />

      <ul>
        {lists.map((l) => (
          <li key={l.id}>
            <strong>{l.name}</strong> — {l.count} action(s)
            <Button
              label="Vider"
              color="yellow"
              size="sm"
              onClick={() => clearList(l.id)}
            />
            <Button
              label="Supprimer"
              color="red"
              size="sm"
              onClick={() => deleteList(l.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
