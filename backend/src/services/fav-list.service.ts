import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavListSummaryDto } from 'src/dtos/favList/fav-list-summary.dto';
import { AdminFavListDto, FavListDto } from 'src/dtos/favList/fav-list.dto';
import {
  FavListClearedResultDto,
  FavListDeletedResultDto,
} from 'src/dtos/favorites/fav-action-result.dto';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { toAdminFavListDto, toFavListDto } from 'src/mappers/favList/fav-list.mapper';
import { toFavListSummaryDto } from 'src/mappers/favList/fav-list.summary.mapper';
import { clearedResult, listDeletedResult } from 'src/mappers/favorites/fav-action.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteListService {
  constructor(@InjectRepository(FavoriteEntity) private favRepo: Repository<FavoriteEntity>) {}

  //? Retourner ses propres listes sans le détail des actions
  async getMyLists(userId: string): Promise<FavListSummaryDto[]> {
    const lists = await this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['favoriteStocks'], //* compter nbr actions via length
      order: { id_favorites: 'DESC' },
    });
    return lists.map(toFavListSummaryDto);
  }

  //? (USER) Retourner ses propres listes détaillées avec toutes les actions
  async getMyDetailedLists(userId: string): Promise<FavListDto[]> {
    const lists = await this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['favoriteStocks', 'favoriteStock.stock'],
      order: { id_favorites: 'DESC' },
    });

    return lists.map(toFavListDto);
  }

  //? (Admin) Retourner TOUTES les listes détaillées de tous les users + pagination simple
  async getAllDetailedListAdmin(opts?: {
    page?: number;
    limit?: number;
  }): Promise<AdminFavListDto[]> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const lists = await this.favRepo.find({
      relations: ['users', 'favoriteStock', 'favoriteStocks.stock'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return lists.map(toAdminFavListDto);
  }

  //? (Admin) Retourner TOUTES les listes détaillées d'un user au choix

  async getUserListsAsAdmin(targetUserId: string): Promise<AdminFavListDto[]> {
    const qb = this.favRepo
      .createQueryBuilder('f')
      .leftJoin('f.user', 'u') //? L’utilisateur lié à chaque liste (f.user → alias 'u')

      .leftJoin('f.favoriteStocks', 'fs') //? Les actions favorites liées à chaque liste (f.favoriteStocks → alias 'fs')

      .where('u.id = :uid', { uid: targetUserId })
      .loadRelationCountAndMap('f.count', 'f.favoriteStocks')
      .orderBy('f.id_favorites', 'DESC');

    const lists = await qb.getMany();
    return lists.map(toAdminFavListDto); // inclut ownerId
  }

  //? Vider une liste en la conservant

  async clearList(userId: string, listId: number): Promise<FavListClearedResultDto> {
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
      relations: ['favoriteStocks'],
    });

    if (!fav) {
      return clearedResult(listId, 0);
    }

    const nb = fav.favoriteStocks.length;

    if (nb) {
      await this.favRepo.manager.remove(fav.favoriteStocks);
    }
    return clearedResult(listId, nb);
  }

  //? Supprimer complétement une liste

  async deleteList(userId: string, listId: number): Promise<FavListDeletedResultDto> {
    const fav = await this.favRepo.findOne({
      where: { id_favorites: listId, user: { id: userId } },
    });
    if (!fav) {
      return listDeletedResult(listId, false);
    }
    await this.favRepo.remove(fav);
    return listDeletedResult(listId, true);
  }
}
