import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RequireRoles } from 'src/decorators/require-role.decorator';
import { SessionUser } from 'src/decorators/session.decorator';
import { CreateFavListDto } from 'src/dtos/favList/create-fav-list.dto';
import { ConnectedGuard } from 'src/guards/connected.guard';
import { RequireRolesGuard } from 'src/guards/require-role.guard';
import { toFavListSummaryDto } from 'src/mappers/favList/fav-list.summary.mapper';

import { FavoriteListService } from 'src/services/fav-list.service';

@Controller('favorites/list')
export class FavListsController {
  constructor(private readonly lists: FavoriteListService) {}

  //! ------------------------------------------USER--------------------------------------

  //? Résumé de MES listes (sans détail des actions)
  @Get('me/summary')
  async getMyListsSummary(@SessionUser('id') userId: string) {
    return this.lists.getMyLists(userId);
  }

  //? Mes listes détaillées (avec actions)
  @Get('me/detailed')
  async getMyDetailedLists(@SessionUser('id') userId: string) {
    return this.lists.getMyDetailedLists(userId);
  }
  //? Creer une nouvelle liste
  @Post()
  async createList(
    @SessionUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateFavListDto,
  ) {
    const created = await this.lists.createList(userId, dto.name);
    return toFavListSummaryDto(created);
  }

  //? Vider une de MES listes

  @Delete(':listId/clear')
  async clearMine(
    @SessionUser('id') userId: string,
    @Param('listId', ParseIntPipe) listId: number,
  ) {
    return this.lists.clearList(userId, listId);
  }

  //? Supprimer complétement une de MES listes

  @Delete(':listId')
  async deleteMyList(
    @SessionUser('id') userId: string,
    @Param('listId', ParseIntPipe) listId: number,
  ) {
    return this.lists.deleteList(userId, listId);
  }

  //! ------------------------------------------ADMIN--------------------------------------
  //? Afficher TOUTES les listes détaillées + pagination

  @UseGuards(ConnectedGuard, RequireRolesGuard)
  @RequireRoles('admin')
  @Get('admin/all')
  async getAllDetailedListsAdmin(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.lists.getAllDetailedListAdmin({ page, limit });
  }

  //? Afficher les listes d'un user ciblé

  @Get('admin/user/:userId')
  async getUserListsAsAdmin(@Param('userId') targetUserId: string) {
    return this.lists.getUserListsAsAdmin(targetUserId);
  }
}
