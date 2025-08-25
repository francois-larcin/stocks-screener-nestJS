import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('UQ_stocks_symbol', { unique: true })
  @Column({ length: 20 })
  symbol: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  sector: string;

  @Column({ length: 50, nullable: true })
  industry: string;

  // Market cap: préfère DECIMAL plutôt que string; ajuste la précision si besoin
  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  market_cap: string | null; // (TypeORM renvoie string pour DECIMAL)

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  // // N -> 1 : currency
  // @ManyToOne(() => CurrencyEntity, (c) => c.stocks, { nullable: false, onDelete: 'NO ACTION' })
  // @JoinColumn({ name: 'id_currencies' })
  // currency: CurrencyEntity;

  // // N -> 1 : stock exchange
  // @ManyToOne(() => StockExchangeEntity, (se) => se.stocks, {
  //   nullable: false,
  //   onDelete: 'NO ACTION',
  // })
  // @JoinColumn({ name: 'id_stock_exchanges' })
  // exchange: StockExchangeEntity;

  // // 1 -> N : financial ratios
  // @OneToMany(() => FinancialRatioEntity, (r) => r.stock, { cascade: false })
  // ratios: FinancialRatioEntity[];
}
