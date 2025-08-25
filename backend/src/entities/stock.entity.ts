// src/entities/stock.entity.ts
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CurrencyEntity } from './currency.entity';
import { StockExchangeEntity } from './stock-exchange.entity';
import { FinancialRatioEntity } from './financial-ratios.entity';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('UQ_stocks_symbol', { unique: true })
  @Column({ type: 'varchar', length: 20 }) // 👈 type explicite
  symbol!: string;

  @Column({ type: 'varchar', length: 255 }) // 👈
  name!: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // 👈 (évite "Object")
  sector!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true }) // 👈
  industry!: string | null;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  market_cap!: string | null; // TypeORM renvoie string pour DECIMAL

  @Column({ type: 'bit', default: false }) // 👈 bool → bit en MSSQL
  enriched!: boolean;

  @Column({ type: 'datetime2', nullable: true }) // 👈
  enriched_at!: Date | null;

  @Column({ type: 'decimal', precision: 18, scale: 6, nullable: true })
  last_price!: string | null;

  @Column({ type: 'datetime2', nullable: true })
  last_price_at!: Date | null;

  @ManyToOne(() => CurrencyEntity, (c) => c.stocks, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_currencies' })
  currency!: CurrencyEntity | null;

  @ManyToOne(() => StockExchangeEntity, (se) => se.stocks, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_stock_exchanges' })
  exchange!: StockExchangeEntity | null;

  @OneToMany(() => FinancialRatioEntity, (r) => r.stock, { cascade: false })
  ratios!: FinancialRatioEntity[];

  @CreateDateColumn({ type: 'datetime2' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at!: Date;
}
