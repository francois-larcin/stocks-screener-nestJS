import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserController } from './controllers/auth.controller';

import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CurrencyEntity } from './entities/currency.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { StockEntity } from './entities/stock.entity';
import { StockExchangeEntity } from './entities/stock-exchange.entity';
import { FinancialRatioEntity } from './entities/financial-ratios.entity';
import { FavoriteStockEntity } from './entities/favorite-stock.entity';

@Module({
  imports: [
    // Charger les variables d'environnement
    ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env'] }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),

    // Servir des fichiers statiques (optionnel)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Connexion à la base SQL Server
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: true,
        trustServerCertificate: true, // utile pour local
      },
      logging: true,
      synchronize: true, // ⚠️ Crée automatiquement les tables
      entities: [
        UserEntity,
        RoleEntity,
        CurrencyEntity,
        FavoriteEntity,
        StockEntity,
        StockExchangeEntity,
        FinancialRatioEntity,
        FavoriteStockEntity,
      ],
    }),

    // Charger les entités pour DI dans les services
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      CurrencyEntity,
      FavoriteEntity,
      StockEntity,
      StockExchangeEntity,
      FinancialRatioEntity,
      FavoriteEntity,
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
