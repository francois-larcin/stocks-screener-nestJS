import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  symbol: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 100, unique: true })
  sector: string;

  @Column({ length: 20, unique: true })
  industry: string;

  @Column({ length: 20, unique: true })
  market_cap: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
