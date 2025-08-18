import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FavoriteStockEntity } from './favorite-stock.entity';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn('increment')
  id_favorites: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  name: string;

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (u) => u.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_users' })
  user: UserEntity;

  @OneToMany(() => FavoriteStockEntity, (fs) => fs.favorite, { cascade: true })
  favoriteStocks: FavoriteStockEntity[];
}
