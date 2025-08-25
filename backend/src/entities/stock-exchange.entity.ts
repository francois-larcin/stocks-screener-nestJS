import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stock-exchanges' })
export class StockExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  code: string;

  //? Relation avec la table stocks
  // @OneToMany(() => StockEntity, (s) => s.exchange)
  // stocks: StockEntity;
}
