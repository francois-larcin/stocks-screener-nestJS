// src/dtos/favorites/favorite-list.dto.ts

import { StockDto } from '../../dtos/Stock/stock.dto';

//* Mon API --> Client
export class FavoriteListDto {
  stocks!: StockDto[];
}
