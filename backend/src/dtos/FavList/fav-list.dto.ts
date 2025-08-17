// src/dtos/favorites/favorite-list.dto.ts

import { StockDto } from '../Stock/stock.dto';

//* Mon API --> Client
//? Rtourner une liste de favoris AVEC les actions la composant
export class FavListDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  stocks!: StockDto[];
}
