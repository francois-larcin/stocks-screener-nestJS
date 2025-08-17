import { IsString, Length } from 'class-validator';

export class RenameFavoriteListDto {
  @IsString()
  @Length(1, 60)
  name!: string;
}
