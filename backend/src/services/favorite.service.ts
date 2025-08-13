import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteStockEntity } from 'src/entities/favorite-stock.entity';
import { FavoriteEntity } from 'src/entities/favorite.entity';
import { StockEntity } from 'src/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity) private favRepo: Repository<FavoriteEntity>,
    @InjectRepository(FavoriteStockEntity) private favStockRepo: Repository<FavoriteStockEntity>,
    @InjectRepository(StockEntity) private stockRepo: Repository<StockEntity>,
  ) {}
}
