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

  //? Vérifier si une action existe déjà dans ma DB, sinon la créer
  // TODO Faire un call vers API externe
  private async upsertStockBySymbol(symbol: string): Promise<StockEntity> {
    const sym = symbol.trim().toUpperCase();

    //* 1) existe déjà ?
    const existing = await this.stockRepo.findOne({ where: { symbol: sym } });
    if (existing) return existing;

    //* 2) crée une action minimale, avec valeurs par défaut compatibles front
    const draft = this.stockRepo.create({
      symbol: sym,
      name: sym, // remplacé plus tard par le vrai nom via provider
      enriched: false,
      enriched_at: null,
      last_price: null,
      last_price_at: null,
      sector: null,
      industry: null,
      market_cap: null,
      currency: null,
      exchange: null,
    });

    try {
      return await this.stockRepo.save(draft);
    } catch (e: any) {
      //* 3) si collision d’unicité (deux requêtes en parallèle), on relit proprement
      //* MSSQL / TypeORM enverra une erreur contrainte unique -> on récupère l’existant
      const again = await this.stockRepo.findOne({ where: { symbol: sym } });
      if (again) return again;
      throw e;
    }
  }

  //? helper pour éviter de dupliquer le lookup
  private async findStockBySymbol(symbol: string): Promise<StockEntity | null> {
    const sym = symbol.trim().toUpperCase();
    return this.stockRepo.findOne({ where: { symbol: sym } });
  }

  // ? Ajouter une action dans une liste
  async addStockToList(
    userId: string,
    listId: number,
    dto: AddDeleteFavoriteDto,
  ): Promise<FavAddedResultDto> {
    // 1) vérifier la liste du user
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });
    if (!fav) throw new NotFoundException('Favorite list not found');

    // 2) garantir l’existence du stock (création minimale si besoin)
    const stock = await this.upsertStockBySymbol(dto.symbol);

    // 3) éviter doublon dans la liste
    const exists = await this.favStockRepo.findOne({
      where: { favorite: { id_favorites: fav.id_favorites }, stock: { id: stock.id } },
    });
    if (exists) throw new ConflictException(`Stock ${dto.symbol} already in list`);

    // 4) créer le lien
    const link = this.favStockRepo.create({ favorite: fav, stock });
    await this.favStockRepo.save(link);

    return addedResult(fav.id_favorites, stock.symbol, true);
  }

  // ? Retirer une action d’une liste
  async removeStockFromList(
    userId: string,
    listId: number,
    dto: AddDeleteFavoriteDto,
  ): Promise<FavRemovedResultDto> {
    // 1) vérifier la liste du user
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });
    if (!fav) throw new NotFoundException('Favorite list not found');

    // 2) NE PAS créer si absent : juste chercher
    const stock = await this.findStockBySymbol(dto.symbol);
    if (!stock) throw new NotFoundException(`Stock ${dto.symbol} not found`);

    // 3) vérifier le lien dans la liste
    const link = await this.favStockRepo.findOne({
      where: { favorite: { id_favorites: fav.id_favorites }, stock: { id: stock.id } },
    });
    if (!link) throw new NotFoundException(`Stock ${dto.symbol} not in list`);

    // 4) supprimer le lien
    await this.favStockRepo.remove(link);

    return removedResult(fav.id_favorites, stock.symbol, true);
  }
}
