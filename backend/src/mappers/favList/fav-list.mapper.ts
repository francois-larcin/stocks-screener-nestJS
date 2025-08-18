import { FavoriteEntity } from 'src/entities/favorite.entity';
import { toStockDtoArray } from '../stocks/stock.read.mapper';
import { AdminFavListDto, FavListDto } from 'src/dtos/favList/fav-list.dto';

//? Entity --> DTO
//* Transformer une entité FavoriteEntity en un DTO FavListDto

export function toFavListSummaryDto(fav: FavoriteEntity): FavListDto {
  const dto = new FavListDto();
  dto.id = fav.id_favorites;
  dto.name = fav.name ?? `Favorites #${fav.id_favorites}`;
  dto.createdAt = fav.created_at;
  dto.stocks = toStockDtoArray((fav.favoriteStocks ?? []).map((favStocks) => favStocks.stock));

  return dto;
}

export function toAdminFavListDto(fav: FavoriteEntity): AdminFavListDto {
  const baseDto = toFavListSummaryDto(fav);

  return {
    ...baseDto,
    ownerId: fav.user.id,
  };
}
