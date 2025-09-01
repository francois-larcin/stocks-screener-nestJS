import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from 'src/entities/currency.entity';
import { FinancialRatioEntity } from 'src/entities/financial-ratios.entity';
import { StockEntity } from 'src/entities/stock.entity';
import { HttpModule } from '@nestjs/axios';
import { StockPriceDailyEntity } from 'src/entities/stock-price-daily.entity';

@Module({
  imports: [
    HttpModule.register({ timeout: 7000 }),
    TypeOrmModule.forFeature([
      StockEntity,
      FinancialRatioEntity,
      CurrencyEntity,
      StockPriceDailyEntity,
    ]),
  ],
  // providers: [StocksService],
  // controllers: [StocksController],
  // exports: [StocksService],
})
export class StockModule {}
