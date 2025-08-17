import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

//* CLient vers mon API
//? Ajouter / Retirer une action d'une liste favoris
export class AddFavoriteDto {
  @IsString()
  @Length(1, 10)
  @IsAlphanumeric()
  @Transform(({ value }) => String(value).trim().toUpperCase())
  symbol!: string;
}
