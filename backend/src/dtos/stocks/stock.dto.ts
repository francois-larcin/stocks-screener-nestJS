// src/dtos/stocks/stock.dto.ts

//* API --> Client
//? Ne pas exposer ttes les colonnes de StockEntity
//? Ex : renvoyer une liste d'actions favorites avec uniquement id, symbol, name

export class StockDto {
  id!: string;
  symbol!: string;
  name!: string;
}
