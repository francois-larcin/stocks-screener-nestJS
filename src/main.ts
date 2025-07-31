import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from './seeds/roles.seed';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //Récupérer la DataSource depuis NestJS
  const dataSource = app.get(DataSource);

  //Lancer le seed aprsè connexion DB
  await seedRoles(dataSource);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
