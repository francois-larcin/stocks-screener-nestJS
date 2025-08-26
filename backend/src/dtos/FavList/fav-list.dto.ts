// src/dtos/favorites/favorite-list.dto.ts

import { StockDto } from '../stocks/stock.dto';

//* Mon API --> Client
//? Retourner une liste de favoris AVEC les actions la composant
export class FavListDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  stocks!: StockDto[];
}

//? Retourner une liste de favoris AVEC les actions la composant en sachant de quel User elle vient
export class AdminFavListDto extends FavListDto {
  ownerId!: string;
}
