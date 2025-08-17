import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRegisterFormDto {
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  username: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsEmail()
  @MaxLength(255)
  email: string;
}

export class AuthLoginFormDto {
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  //? Peut contenir email OU username
  credentials: string;

  @IsString()
  // @IsStrongPassword()
  password: string;
}
