import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginFormDto, AuthRegisterFormDto } from 'src/dtos/auth.form.dto';
import { AuthRegisterFormDtoToUserEntity } from 'src/mappers/user.mappers';
import { UserService } from 'src/services/user.service';

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
  async login(@Body() body: AuthLoginFormDto) {
    const user = await this.userService.login(body.credentials, body.password);

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role.name,
    });

    return { token, user };
  }
}
