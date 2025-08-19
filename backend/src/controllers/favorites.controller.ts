import { Controller, Param, Req, Post } from '@nestjs/common';
import { FavoriteService } from 'src/services/fav-list.service';
import { Session } from 'src/shared/interfaces/session.interface';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favorites: FavoriteService) {}

  //* POST /favorites/:symbol/toggle

  @Post('symbol/:symbol/toggle')
  async toggle(@Param('symbol') symbol: string, @Req() req: Request & { session: Session }) {
    return this.favorites.toggleSymbol(req.session.id!, symbol);
  }
}
