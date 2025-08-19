import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddDeleteFavoriteDto } from 'src/dtos/favorites/add-fav.dto';
import { FavAddedResultDto, FavRemovedResultDto } from 'src/dtos/favorites/fav-action-result.dto';
import { FavStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { StockEntity } from 'src/entities/stock.entity';
import { addedResult, removedResult } from 'src/mappers/favorites/fav-action.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class FavStockService {
  constructor(
    @InjectRepository(FavStockEntity) private favStockRepo: Repository<FavStockEntity>,
    @InjectRepository(FavoriteEntity) private favRepo: Repository<FavoriteEntity>,
    @InjectRepository(StockEntity) private stockRepo: Repository<StockEntity>,
  ) {}

  private async upsertStockBySymbol(symbol: string): Promise<StockEntity> {
    const sym = symbol.trim().toUpperCase();
    let stock = await this.stockRepo.findOne({ where: { symbol: sym } });
    if (!stock)
      stock = await this.stockRepo.save(this.stockRepo.create({ symbol: sym, name: sym }));
    return stock;
  }

  async addStockToList(
    userId: string,
    listId: number,
    dto: AddDeleteFavoriteDto,
  ): Promise<FavAddedResultDto> {
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });
    if (!fav) throw new NotFoundException('List not found');

    const stock = await this.upsertStockBySymbol(dto.symbol);

    const exists = await this.favStockRepo.findOne({
      where: { favorite: { id_favorites: fav.id_favorites }, stock: { id: stock.id } },
    });
    if (exists) throw new ConflictException(`Stock ${dto.symbol} already in list`);

    await this.favStockRepo.save(this.favStockRepo.create({ favorite: fav, stock }));
    return addedResult(fav.id_favorites, stock.symbol, true);
  }

  async removeStockFromList(
    userId: string,
    listId: number,
    dto: AddDeleteFavoriteDto,
  ): Promise<FavRemovedResultDto> {
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });
    if (!fav) throw new NotFoundException('List not found');

    const stock = await this.upsertStockBySymbol(dto.symbol);

    const link = await this.favStockRepo.findOne({
      where: { favorite: { id_favorites: fav.id_favorites }, stock: { id: stock.id } },
    });
    if (!link) throw new NotFoundException(`Stock ${dto.symbol} not in list`);

    await this.favStockRepo.remove(link);
    return removedResult(fav.id_favorites, stock.symbol, true);
  }
}
