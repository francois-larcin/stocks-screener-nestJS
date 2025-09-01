import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/auth.controller';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev', // Assure-toi que ce chemin est correct
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [UserController],
  providers: [UserService, AuthMiddleware],
  exports: [UserService, AuthMiddleware, JwtModule],
})
export class AuthModule {}
