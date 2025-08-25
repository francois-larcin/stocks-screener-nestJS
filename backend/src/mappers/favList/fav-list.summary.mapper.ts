import { FavListSummaryDto } from 'src/dtos/favList/fav-list-summary.dto';
import { FavoriteEntity } from 'src/entities/favorite.entity';

//? Entity --> DTO
//* Transformer une entité FavoriteEntity en un résumé FavListSummaryDto
export function toFavListSummaryDto(favEnt: FavoriteEntity): FavListSummaryDto {
  return {
    id: favEnt.id_favorites,
    name: favEnt.name ?? `Favorites #${favEnt.id_favorites}`,
    createdAt: favEnt.created_at,
    count: favEnt.favoriteStocks?.length ?? 0,
  };
}
