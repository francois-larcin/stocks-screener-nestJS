// src/dtos/favorites/favorite-action-result.dto.ts

//* Décrire le résultat d'une opération effectuée sur les favoris
//? Ajouter AAPL à une liste de favoris : { "ok": true, "added": true, "symbol": "AAPL" }

export class FavoriteAddedResultDto {
  ok!: true;
  added!: boolean;
  symbol!: string;
  listId!: number;
}
export class FavoriteRemovedResultDto {
  ok!: true;
  removed!: boolean;
  symbol!: string;
  listId!: number;
}
export class FavoriteClearedResultDto {
  ok!: true;
  cleared!: number;
  listId!: number;
}
export class FavoriteListDeletedResultDto {
  ok!: true;
  deleted!: boolean;
  listId!: number;
}
