import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SessionUser } from 'src/decorators/session.decorator';
import { AddDeleteFavoriteDto } from 'src/dtos/favorites/add-fav.dto';
import { FavStockService } from 'src/services/fav-stock.service';

@Controller('favorites/lists/:listId/stocks')
export class FavStockController {
  constructor(private readonly stocks: FavStockService) {}

  //? Ajouter une action (symbol dans le body)

  @Post()
  async add(
    @SessionUser('id') userId: string,
    @Param('listId', ParseIntPipe) listId: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: AddDeleteFavoriteDto,
  ) {
    return this.stocks.addStockToList(userId, listId, dto);
  }

  //? Retirer une action (symbol dans le body)

  @Delete(':symbol')
  async remove(
    @SessionUser('id') userId: string,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('symbol', new ValidationPipe({ transform: true }))
    symbol: AddDeleteFavoriteDto['symbol'],
  ) {
    return this.stocks.removeStockFromList(userId, listId, { symbol });
  }
}
