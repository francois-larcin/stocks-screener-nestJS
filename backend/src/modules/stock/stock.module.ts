import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockEntity } from 'src/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  exports: [TypeOrmModule],
})
export class StockModule {}
