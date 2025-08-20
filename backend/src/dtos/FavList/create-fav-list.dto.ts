import { IsString, Length } from 'class-validator';

export class CreateFavListDto {
  @IsString()
  @Length(1, 60)
  name?: string; // ex: "Tech", "Long terme"
}
