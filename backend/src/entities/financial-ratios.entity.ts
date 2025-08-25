import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'financial_ratios' })
export class FinancialRatioEntity {
  @PrimaryGeneratedColumn('increment')
  id_financial_ratios: number;

  @Column({ type: 'date', nullable: false })
  //* Année de l'exercice comptable sur laquelle se basent les ratios
  ratio_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pe_ratio: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  peg_ratio: string | null;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  ebitda: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  net_income_growth: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  cashflow_growth: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  net_margin: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  gross_margin: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  operating_margin: string | null;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  capex: string | null;

  @Column({ type: 'datetime2', nullable: true })
  //* date/heure de la valeur boursière ou du cours associé à ces ratios.
  stock_date: Date | null;

  //? Relation avec la table stocks
  // @ManyToOne(() => StockEntity, (s) => s.ratios, { onDelete: 'CASCADE', nullable: false })
  // @JoinColumn({ name: 'id_stocks' })
  // stock: StockEntity;
}
