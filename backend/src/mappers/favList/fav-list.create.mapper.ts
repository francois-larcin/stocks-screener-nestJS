import { CreateFavListDto } from 'src/dtos/favList/create-fav-list.dto';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { UserEntity } from 'src/entities/user.entity';

//* DTO --> Entity

export function favListCreateDtoToEntity(dto: CreateFavListDto, userId: string): FavoriteEntity {
  const entity = new FavoriteEntity();

  if (dto.name !== undefined) {
    entity.name = dto.name.trim();
  }

  //? Ne pas charger toute l'entité UserEntity

  entity.user = { id: userId } as UserEntity;
  return entity;
}
