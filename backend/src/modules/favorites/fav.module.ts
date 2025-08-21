import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavListsController } from 'src/controllers/fav-list.controller';
import { FavStockController } from 'src/controllers/fav-stock.controller';
import { FavStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { StockEntity } from 'src/entities/stock.entity';
import { RequireRolesGuard } from 'src/guards/require-role.guard';
import { FavoriteListService } from 'src/services/fav-list.service';
import { FavStockService } from 'src/services/fav-stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity, FavStockEntity, StockEntity])],
  controllers: [FavListsController, FavStockController],
  providers: [FavStockService, FavoriteListService, RequireRolesGuard, Reflector],
  exports: [FavoriteListService, FavStockService],
})
export class FavoriteModule {}
