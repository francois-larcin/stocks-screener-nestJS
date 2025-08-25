// src/dtos/stocks/stock.dto.ts

//* API --> Client
//? Ne pas exposer ttes les colonnes de StockEntity
//? Ex : renvoyer une liste d'actions favorites avec uniquement id, symbol, name

export class StockDto {
  id!: string;
  symbol!: string;
  name!: string;

  //* Champs d’affichage simples
  enriched!: boolean;
  enrichedAt!: Date | null;

  //* Prix simplifié
  lastPrice!: number | null;
  lastPriceAt!: Date | null;

  //* Métadonnées optionnelles
  sector!: string | null;
  industry!: string | null;
  marketCap!: number | null;

  //* Relations résumées
  currency?: string | null; // ex: "USD"
  exchange?: string | null; // ex: "NASDAQ"
}
