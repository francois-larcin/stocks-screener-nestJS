import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavListsController } from 'src/controllers/fav-list.controller';
import { FavStockController } from 'src/controllers/fav-stock.controller';
import { FavStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';

import { RequireRolesGuard } from 'src/guards/require-role.guard';
import { FavoriteListService } from 'src/services/fav-list.service';
import { FavStockService } from 'src/services/fav-stock.service';
import { StockModule } from '../stock/stock.module';
import { StockEntity } from 'src/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity, FavStockEntity, StockEntity]), StockModule],
  controllers: [FavListsController, FavStockController],
  providers: [FavStockService, FavoriteListService, RequireRolesGuard, Reflector],
  exports: [FavoriteListService, FavStockService],
})
export class FavoriteModule {}
