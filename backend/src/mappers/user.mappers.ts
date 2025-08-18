import { AuthRegisterFormDto } from 'src/dtos/auth/auth.form.dto';
import { UserEntity } from 'src/entities/user.entity';

//DTO => Entity
export function AuthRegisterFormDtoToUserEntity(dto: AuthRegisterFormDto): UserEntity {
  const user = new UserEntity();
  user.username = dto.username.toLowerCase();
  user.password = dto.password;
  user.email = dto.email;

  return user;
}
