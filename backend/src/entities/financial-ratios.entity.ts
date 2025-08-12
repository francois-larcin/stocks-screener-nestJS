import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'stocks' })
export class FinancialRatioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  ratio_date: Date;

  @Column()
  pe_ratio: number;

  @Column()
  peg_ratio: number;

  @Column()
  ebitda: number;

  @Column()
  net_income_growth: number;

  @Column()
  cashflow_growth: number;

  @Column()
  net_margin: number;

  @Column()
  gross_margin: number;

  @Column()
  capex: number;

  @UpdateDateColumn({ type: 'datetime' })
  stock_date: Date;

  //? Relation avec la table stocks
}
