import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './stock.entity';

@Entity({ name: 'stock-exchanges' })
export class StockExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  code: string;

  //? Relation avec la table stocks
  @OneToMany(() => StockEntity, (s) => s.exchange)
  stocks: StockEntity;
}
