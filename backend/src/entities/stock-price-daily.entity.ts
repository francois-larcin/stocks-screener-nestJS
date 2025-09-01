// backend/src/modules/stock/stock-price-daily.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { StockEntity } from './stock.entity';

@Entity('stock_price_daily')
@Unique(['stock', 'date'])
export class StockPriceDailyEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => StockEntity, (s) => s.id, { onDelete: 'CASCADE' })
  stock: StockEntity;

  @Column({ type: 'date' }) date: string; // YYYY-MM-DD
  @Column('decimal', { precision: 18, scale: 6, nullable: true }) close?: number;
}
