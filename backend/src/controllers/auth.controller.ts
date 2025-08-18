import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginFormDto, AuthRegisterFormDto } from 'src/dtos/auth/auth.form.dto';
import { AuthRegisterFormDtoToUserEntity } from 'src/mappers/user.mappers';
import { UserService } from 'src/services/user.service';
import { RoleEnum } from 'src/shared/enum/role.enum';
import { ConnectedGuard } from 'src/guards/connected.guard';
import { Session } from 'src/shared/interfaces/session.interface';
import { Request } from 'express';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: AuthRegisterFormDto) {
    const newUser = AuthRegisterFormDtoToUserEntity(body);
    await this.userService.create(newUser);

    return;
  }

  @Post('login')
  async login(@Body() dto: AuthLoginFormDto) {
    const user = await this.userService.login(dto.credentials, dto.password);

    //?Sécuriser la dérivation du rôle
    const roleId = Number(user.role?.id);
    const idToEnum: Record<number, RoleEnum> = {
      [RoleEnum.ADMIN]: RoleEnum.ADMIN,
      [RoleEnum.USER]: RoleEnum.USER,
    };

    const role: RoleEnum = idToEnum[roleId] ?? RoleEnum.USER;

    //? payload du middleware = Session
    const payload: Session = {
      id: user.id,
      role,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    return {
      ok: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role,
      },
    };
  }

  @Post('logout')
  logout() {
    // rien à faire côté serveur en JWT stateless
    return { ok: true };
  }

  @UseGuards(ConnectedGuard)
  @Get('me')
  async me(@Req() req: Request & { session: Session }) {
    if (!req.session.id) {
      throw new UnauthorizedException('No user ID in session');
    }
    return this.userService.findByIdWithRole(req.session.id);
  }

  @UseGuards(ConnectedGuard)
  @Get('admin-area')
  adminOnly(@Req() req: Request & { session: Session }) {
    if (req.session.role !== RoleEnum.ADMIN) {
      throw new ForbiddenException();
    }
    return { ok: true };
  }

  @UseGuards(ConnectedGuard)
  @Get(':id')
  getUser(@Param('id') id: string, @Req() req: Request & { session: Session }) {
    const isSelf = req.session.id === id;
    const isAdmin = req.session.role === RoleEnum.ADMIN;
    if (!isSelf && !isAdmin) {
      throw new ForbiddenException();
    }
    return this.userService.findByIdWithRole(id);
  }
}
