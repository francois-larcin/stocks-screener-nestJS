import { StockDto } from 'src/dtos/stocks/stock.dto';
import { StockEntity } from 'src/entities/stock.entity';

//? Entity --> DTO

//* Prendre et exposer les données pertinentes de StockEntity et retourner le DTO
export function toStockDto(entity: StockEntity): StockDto {
  const dto = new StockDto();
  dto.id = entity.id;
  dto.symbol = entity.symbol;
  dto.name = entity.name;

  return dto;
}

//* Transformer une collection d'entités en une collection de DTOs
//* items = tableau d'objets

export function toStockDtoArray(items: StockEntity[]): StockDto[] {
  return items.map(toStockDto);
}
