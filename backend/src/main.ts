import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from './seeds/roles.seed';
import { ValidationPipe } from '@nestjs/common';
import { seedAdmin } from './seeds/admin.seed';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //?Config CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
  });

  //? Validation des DTOs
  app.useGlobalPipes(new ValidationPipe());

  //? Gestion des erreurs
  app.useGlobalFilters(new HttpExceptionFilter());

  //Récupérer la DataSource depuis NestJS
  const dataSource = app.get(DataSource);

  //Lancer le seed aprsè connexion DB
  //TODO A changer en production
  await seedRoles(dataSource);
  await seedAdmin(dataSource);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
