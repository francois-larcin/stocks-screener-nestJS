import { useParams } from "react-router-dom";
import { useFavStocks } from "../../hooks/favorites/useFavStocks";
import { Button } from "../../components";

export default function FavoriteDetailPage() {
  const { id } = useParams();
  const listId = Number(id);
  const { list, loading, removeSymbol } = useFavStocks(listId);

  if (loading) return <div>Chargement…</div>;
  if (!list) {
    console.log("DetailPage: id param =", id, "→ listId =", listId);
    return <div>Liste introuvable</div>;
  }

  return (
    <div>
      <h1>{list.name}</h1>
      <ul>
        {list.stocks.map((s) => (
          <li key={s.id}>
            <strong>{s.symbol}</strong> — {s.name}
            <Button
              label="Supprimer"
              color="red"
              size="sm"
              onClick={() => removeSymbol(s.symbol)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
