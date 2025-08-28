import { useCallback, useEffect, useState } from "react";
import { api } from "../../api/api";

export type StockItem = {
  id: string;
  symbol: string;
  name: string;
  enriched: boolean;
  enrichedAt: string | null;
  lastPrice: number | null;
  lastPriceAt: string | null;
};

export type StockItemFull = {
  id: string;
  symbol: string;
  name: string;
  rating?: number | null;
  exchange?: string | null;
  country?: string | null;
  sector?: string | null;
  marketCap?: number | null;
};

export type FavListDetailed = {
  id: number;
  name: string;
  createdAt: string;
  stocks: StockItemFull[];
};

export function useFavStocks(listId?: number) {
  const [list, setList] = useState<FavListDetailed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!listId) return;
    setError(null);
    const { data } = await api.get<FavListDetailed>(
      `/favorites/lists/${listId}`
    );
    setList(data);
  }, [listId]);

  //? Stock

  async function addSymbol(symbol: string) {
    if (!listId) {
      return;
    }
    await api.post(`/favorites/lists/${listId}/stocks`, { symbol });
    await reload();
  }

  async function removeSymbol(symbol: string) {
    if (!listId) {
      return;
    }
    await api.delete(`/favorites/lists/${listId}/stocks`, { data: { symbol } });
    await reload();
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await reload();
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Erreur de chargement");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  return {
    list,
    loading,
    error,
    reload,
    addSymbol,
    removeSymbol,
  };
}
