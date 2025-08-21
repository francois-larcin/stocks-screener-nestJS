//* DTO --> Entity
//? Créer une relation entre une liste de favoris et une action

import { FavStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { StockEntity } from 'src/entities/stock.entity';

export function favStockCreate(favorite: FavoriteEntity, stock: StockEntity): FavStockEntity {
  const entity = new FavStockEntity();
  entity.favorite = favorite;
  entity.stock = stock;

  return entity;
}
