import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { FavoriteModule } from './modules/favorites/fav.module';
import { AuthModule } from './modules/auth/auth.module';
import { StockModule } from './modules/stock/stock.module';

@Module({
  imports: [
    // Charger les variables d'environnement
    ConfigModule.forRoot({ envFilePath: ['.env.dev', '.env'] }),

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
        trustServerCertificate: true, //* utile pour local
      },
      logging: true,
      synchronize: true, //* Crée automatiquement les tables
      autoLoadEntities: true,
    }),

    AuthModule,
    FavoriteModule,
    StockModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
