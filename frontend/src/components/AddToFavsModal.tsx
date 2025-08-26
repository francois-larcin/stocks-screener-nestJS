// src/components/favorites/AddToFavoritesModalConfirm.tsx
import { useState } from "react";
import { Modal } from "./Modal";



export type FavListSummary = { id: number; name: string; count: number };

type Props = {
  isOpen: boolean;
  symbol: string;
  lists: FavListSummary[];
  onConfirm: (listId: number) => Promise<void> | void;
  onClose: () => void;
};

export default function AddToFavoritesModalConfirm({
  isOpen,
  symbol,
  lists,
  onConfirm,
  onClose,
}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      title={`Ajouter ${symbol} à…`}
      cancelLabel="Annuler"
      cancelFn={() => {
        setSelectedId(null);
        setError(null);
        onClose();
      }}
      primaryLabel="Confirmer"
      primaryFn={async () => {
        if (selectedId == null) {
          setError("Choisis une liste avant de confirmer.");
          return;
        }
        setError(null);
        await onConfirm(selectedId);
        setSelectedId(null);
        onClose();
      }}
    >
      <div className="grid gap-2">
        {lists.length === 0 && (
          <p>Aucune liste de favoris. Crée d’abord une liste.</p>
        )}

        {lists.map((l) => (
          <label key={l.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="favoriteList"
              value={l.id}
              checked={selectedId === l.id}
              onChange={() => setSelectedId(l.id)}
            />
            <span>
              {l.name} <span className="opacity-60">({l.count})</span>
            </span>
          </label>
        ))}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    </Modal>
  );
}
