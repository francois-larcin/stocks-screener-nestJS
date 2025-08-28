import { useParams } from "react-router-dom";
import { useFavStocks } from "../../hooks/favorites/useFavStocks";
import { Button } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { marketcapRange } from "../../utils/stock/marketcap";
import { StarRating } from "../../components/StarRating";

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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{list.name}</h1>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white">
          <thead className="text-left text-sm text-slate-600 border-b">
            <tr>
              <th className="py-3 px-4">Nom de l’entreprise</th>
              <th className="py-3 px-4">Ticker</th>
              <th className="py-3 px-4">Note</th>
              <th className="py-3 px-4">Place boursière</th>
              <th className="py-3 px-4">Pays</th>
              <th className="py-3 px-4">Secteurs</th>
              <th className="py-3 px-4">Capitalisation</th>
              <th className="py-3 px-2 w-12 text-right"></th>
            </tr>
          </thead>
          <tbody className="[&>tr:hover]:bg-slate-50">
            {list.stocks.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-3 px-4 font-medium">{s.name}</td>
                <td className="py-3 px-4">{s.symbol}</td>
                <td className="py-3 px-4">
                  {/* adapte quand tu auras une vraie note (0–5) ; provisoire: 0 */}
                  <StarRating value={s.rating ?? 0} />
                </td>
                <td className="py-3 px-4">{s.exchange ?? "—"}</td>
                <td className="py-3 px-4">{s.country ?? "—"}</td>
                <td className="py-3 px-4">{s.sector ?? "—"}</td>
                <td className="py-3 px-4">
                  {marketcapRange(s.marketCap ?? null)}
                </td>
                <td className="py-3 px-2 text-right">
                  <Button
                    label={<FontAwesomeIcon icon={["fas", "trash-can"]} />}
                    color="red"
                    size="sm"
                    onClick={() => removeSymbol(s.symbol)}
                  />
                </td>
              </tr>
            ))}
            {list.stocks.length === 0 && (
              <tr>
                <td
                  className="py-6 px-4 text-center text-slate-500"
                  colSpan={8}
                >
                  Aucune action dans cette liste.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
