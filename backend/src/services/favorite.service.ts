import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { StockEntity } from 'src/entities/stock.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity) private favRepo: Repository<FavoriteEntity>,
    @InjectRepository(FavoriteStockEntity) private favStockRepo: Repository<FavoriteStockEntity>,
    @InjectRepository(StockEntity) private stockRepo: Repository<StockEntity>,
  ) {}

  private async ensureUserFavoriteList(userId: string): Promise<FavoriteEntity> {
    let fav = await this.favRepo.findOne({ where: { user: { id: userId } } });

    if (!fav) {
      const userRef: Pick<UserEntity, 'id'> = { id: userId };
      fav = this.favRepo.create({ user: userRef as UserEntity });
      fav = await this.favRepo.save(fav);
    }
    return fav;
  }

  private async updateInsertStockBySymbol(symbol: string): Promise<StockEntity> {
    const sym = symbol.trim().toUpperCase();
    let stock = await this.stockRepo.findOne({ where: { symbol: sym } });

    //* S'assurer que l'action existe bien dans la DB globale
    if (!stock) {
      stock = this.stockRepo.create({ symbol: sym, name: sym }); //TODO A remplacer plus tard par le vrai nom de l'action
      stock = await this.stockRepo.save(stock);
    }
    return stock;
  }

  async toggleSymbol(userId: string, symbol: string) {
    const fav = await this.ensureUserFavoriteList(userId);
    const stock = await this.updateInsertStockBySymbol(symbol);

    //* S'assurer que l'action existe bien dans la liste de favoris
    const existing = await this.favStockRepo.findOne({
      where: {
        favorite: { id_favorites: fav.id_favorites },
        stock: { id: stock.id },
      },
      relations: ['favorites', 'stock'],
    });

    if (existing) {
      await this.favStockRepo.remove(existing);
      return { ok: true, removed: true, symbol: stock.symbol };
    }

    const favStock = this.favStockRepo.create({
      favorite: fav,
      stock: stock,
    });
    await this.favStockRepo.save(favStock);

    return { ok: true, added: true, symbol: stock.symbol };
  }

  async returnList(userId: string): Promise<StockEntity[]> {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId } },
      relations: ['favoriteStocks', 'favoriteStocks.stock'],
      order: { id_favorites: 'DESC' },
    });
    return fav ? fav.favoriteStocks.map((favStock) => favStock.stock) : [];
  }
}
