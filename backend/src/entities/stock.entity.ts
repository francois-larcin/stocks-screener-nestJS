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
  @Column({ length: 20 })
  symbol!: string;

  @Column({ length: 255 })
  name!: string; // fallback = symbol tant que non enrichi

  @Column({ length: 100, nullable: true })
  sector!: string | null;

  @Column({ length: 50, nullable: true })
  industry!: string | null;

  // DECIMAL: TypeORM renvoie une string côté Node (normal)
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  market_cap!: string | null;

  // --- Affichage / enrichissement léger ---
  @Column({ default: false })
  enriched!: boolean;

  @Column({ type: 'datetime2', nullable: true })
  enriched_at!: Date | null;

  @Column({ type: 'decimal', precision: 18, scale: 6, nullable: true })
  last_price!: string | null;

  @Column({ type: 'datetime2', nullable: true })
  last_price_at!: Date | null;

  // --- Relations optionnelles (ajout depuis favoris sans API externe) ---
  @ManyToOne(() => CurrencyEntity, (c) => c.stocks, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_currencies' })
  currency!: CurrencyEntity | null;

  @ManyToOne(() => StockExchangeEntity, (se) => se.stocks, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_stock_exchanges' })
  exchange!: StockExchangeEntity | null;

  @OneToMany(() => FinancialRatioEntity, (r) => r.stock, { cascade: false })
  ratios!: FinancialRatioEntity[]; // chargés quand nécessaire

  // --- Traces ---
  @CreateDateColumn({ type: 'datetime2' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at!: Date;
}
