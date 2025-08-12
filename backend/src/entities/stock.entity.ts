import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StockExchangeEntity } from './stock-exchange.entity';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('UQ_stocks_symbol', { unique: true })
  @Column({ length: 20 })
  symbol: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 100, nullable: true })
  sector: string | null;

  @Column({ length: 100, nullable: true })
  industry: string | null;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  market_cap: string | null;

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  //? Relation avec la table financial_rations

  //? Relation avec la table currencies
  @ManyToOne(() => StockExchangeEntity, (se) => se.stocks, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_stock_exchange' })
  exchange: StockExchangeEntity;

  //? Relation avec la table stock_exchanges
}
