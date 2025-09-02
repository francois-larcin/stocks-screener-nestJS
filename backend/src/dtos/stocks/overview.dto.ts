// dto/overview.dto.ts
import { StockDto } from './stock.dto';

export class StockOverviewDto extends StockDto {
  // ratios
  pe!: number;
  pb!: number;
  ps!: number;
  roe!: number;
  roa!: number;
  profitMargin!: number;
  debtToEquity!: number;
  dividendYield!: number;
}
