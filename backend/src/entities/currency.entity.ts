import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './stock.entity';

@Entity({ name: 'currencies' })
export class CurrencyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  code: string;

  //? Relation avec la table stocks

  @OneToMany(() => StockEntity, (s) => s.currency)
  stocks: StockEntity[];
}
