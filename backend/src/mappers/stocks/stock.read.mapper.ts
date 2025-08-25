import { StockDto } from 'src/dtos/stocks/stock.dto';
import { StockEntity } from 'src/entities/stock.entity';

//? Entity --> DTO

//* Prendre et exposer les données pertinentes de StockEntity et retourner le DTO
export function toStockDto(entity: StockEntity): StockDto {
  return {
    id: entity.id,
    symbol: entity.symbol,
    name: entity.name,

    enriched: entity.enriched,
    enrichedAt: entity.enriched_at,

    // DECIMAL/NUMERIC = string en Node → Number() pour front
    lastPrice: entity.last_price ? Number(entity.last_price) : null,
    lastPriceAt: entity.last_price_at,

    sector: entity.sector ?? null,
    industry: entity.industry ?? null,
    marketCap: entity.market_cap ? Number(entity.market_cap) : null,

    currency: entity.currency ? entity.currency.code : null, // dépend de ta CurrencyEntity
    exchange: entity.exchange ? entity.exchange.code : null, // idem pour StockExchangeEntity
  };
}

//* Transformer une collection d'entités en une collection de DTOs
//* items = tableau d'objets

export function toStockDtoArray(items: StockEntity[]): StockDto[] {
  return items.map(toStockDto);
}
