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

  //? Ajout/suppression d'une action
  async toggleSymbol(
    userId: string,
    symbol: string,
  ): Promise<{ ok: boolean; added?: boolean; removed?: boolean; symbol: string }> {
    const fav = await this.ensureUserFavoriteList(userId);
    const stock = await this.updateInsertStockBySymbol(symbol);

    //* S'assurer que l'action existe bien dans la liste de favoris
    const existing = await this.favStockRepo.findOne({
      where: {
        favorite: { id_favorites: fav.id_favorites },
        stock: { id: stock.id },
      },
      relations: ['favorite', 'stock'],
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

  async getFavoritesByUser(userId: string): Promise<StockEntity[]> {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId } },
      relations: ['favoriteStocks', 'favoriteStocks.stock'],
      order: { id_favorites: 'DESC' },
    });
    return fav ? fav.favoriteStocks.map((favStock) => favStock.stock) : [];
  }

  //? Vider une liste mais en laissant la structure existante

  async clearFavorites(userId: string): Promise<{ ok: boolean; cleared: number }> {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId } },
      relations: ['favoriteStocks'],
    });

    if (!fav) {
      return { ok: true, cleared: 0 };
    }

    const count = fav.favoriteStocks.length;
    if (count > 0) {
      await this.favStockRepo.remove(fav.favoriteStocks);
    }
    //* count = cb d'actions enlevées de la liste
    return { ok: true, cleared: count };
  }

  //? Supprimer complétement une liste

  async deleteFavoriteList(
    userId: string,
    listId: number,
  ): Promise<{ ok: boolean; deleted: boolean }> {
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });

    if (!fav) {
      return { ok: false, deleted: false };
    }

    await this.favRepo.remove(fav);

    return { ok: true, deleted: true };
  }
}
