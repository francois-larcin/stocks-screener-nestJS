import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from 'src/entities/currency.entity';
import { FinancialRatioEntity } from 'src/entities/financial-ratios.entity';
import { StockExchangeEntity } from 'src/entities/stock-exchange.entity';
import { StockEntity } from 'src/entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockEntity,
      CurrencyEntity,
      StockExchangeEntity,
      FinancialRatioEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class StockModule {}
