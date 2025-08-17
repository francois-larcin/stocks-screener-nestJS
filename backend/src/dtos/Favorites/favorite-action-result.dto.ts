// src/dtos/favorites/favorite-action-result.dto.ts

//* Décrire le résultat d'une opération effectuée sur les favoris
//? Ajouter AAPL à une liste de favoris : { "ok": true, "added": true, "symbol": "AAPL" }

export class FavoriteAddedResultDto {
  ok!: true;
  added!: boolean; // true si ajouté, false si déjà présent
  symbol!: string;
}

export class FavoriteRemovedResultDto {
  ok!: true;
  removed!: boolean; // true si supprimé, false si déjà absent
  symbol!: string;
}

export class FavoriteClearedResultDto {
  ok!: true;
  cleared!: number; // nb d’actions retirées
}

export class FavoriteListDeletedResultDto {
  ok!: true;
  deleted!: boolean;
}
