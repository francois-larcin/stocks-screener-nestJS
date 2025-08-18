import { RenameFavoriteListDto } from 'src/dtos/favList/rename-fav-list.dto';
import { FavoriteEntity } from 'src/entities/favorite.entity';

//* DTO --> Entity

export function applyFavListRename(
  entity: FavoriteEntity,
  dto: RenameFavoriteListDto,
): FavoriteEntity {
  if (dto.name !== undefined) {
    entity.name = dto.name.trim();
  }
  return entity;
}
