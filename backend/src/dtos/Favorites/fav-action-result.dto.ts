// src/dtos/favorites/favorite-action-result.dto.ts

//* Décrire le résultat d'une opération effectuée sur les favoris
//? Ajouter AAPL à une liste de favoris : { "ok": true, "added": true, "symbol": "AAPL" }

export class FavAddedResultDto {
  ok!: true;
  added!: boolean;
  symbol!: string;
  listId!: number;
}
export class FavRemovedResultDto {
  ok!: true;
  removed!: boolean;
  symbol!: string;
  listId!: number;
}

//? Vider une liste sans la supprimer
export class FavListClearedResultDto {
  ok!: true;
  cleared!: number;
  listId!: number;
}

//? Supprimer la liste
export class FavListDeletedResultDto {
  ok!: true;
  deleted!: boolean;
  listId!: number;
}
