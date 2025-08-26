import { useState } from "react";
import AddToFavoritesModalConfirm from "./AddToFavsModal";
import { Button } from "./Button";
import { api } from "../api/api";
import { useFavLists } from "../hooks/favorites/useFavLists";

export function FavoriteHeartButton({ symbol }: { symbol: string }) {
  const [open, setOpen] = useState(false);
  const { lists, reload } = useFavLists();

  // addSymbol est côté useFavStocks (par listId) — mais ici on ajoute à une liste choisie :
  async function addTo(listId: number) {
    await api.post(`/favorites/lists/${listId}/stocks`, { symbol });
  }

  return (
    <>
      <Button
        label="💜"
        color="yellow"
        size="sm"
        onClick={async () => {
          await reload();
          setOpen(true);
        }}
      />
      <AddToFavoritesModalConfirm
        isOpen={open}
        onClose={() => setOpen(false)}
        symbol={symbol}
        lists={lists}
        onConfirm={(listId) => addTo(listId)}
      />
    </>
  );
}
