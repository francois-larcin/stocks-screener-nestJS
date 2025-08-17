import { IsString, Length } from 'class-validator';

export class CreateFavoriteListDto {
  @IsString()
  @Length(1, 60)
  name?: string; // ex: "Tech", "Long terme"
}
