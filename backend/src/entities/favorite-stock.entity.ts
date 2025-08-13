import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './stock.entity';
import { FavoriteEntity } from './favorite.entity';

@Entity({ name: 'favorite_stocks' })
export class FavoriteStockEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => StockEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_stocks' })
  stock: StockEntity;

  @ManyToOne(() => FavoriteEntity, (f) => f.favoriteStocks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_favorites' })
  favorite: FavoriteEntity;
}
