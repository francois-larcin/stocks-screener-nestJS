import { useEffect, useState } from "react";
import { api } from "../../api/api";

export type FavListSummary = {
  id: number;
  name: string;
  createdAt: string;
  count: number;
};

export function useFavLists() {
  const [lists, setLists] = useState<FavListSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setError(null);
    const { data } = await api.get<FavListSummary[]>(
      "/favorites/lists/me/summary"
    );
    setLists(data);
  }

  //? Actions "list"

  async function createList(name?: string) {
    await api.post("favorites/lists", name ? { name } : {});
    await reload;
  }

  async function clearList(listId: number) {
    await api.delete(`/favorites/lists/${listId}/clear`);
    await reload();
  }

  async function deleteList(listId: number) {
    await api.delete(`/favorites/lists/${listId}`);
    await reload;
  }

  useEffect(() => {
    (async () => {
      try {
        await reload();
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Erreur inconnue");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    lists,
    loading,
    error,
    reload,
    createList,
    clearList,
    deleteList,
  };
}
