import { useParams } from "react-router-dom";
import { useFavStocks } from "../../hooks/favorites/useFavStocks";
import { Button } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              label={<FontAwesomeIcon icon={["fas", "trash-can"]} />}
              color="red"
              size="md"
              onClick={() => removeSymbol(s.symbol)}
              title="Supprimer"
              ariaLabel="Supprimer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
