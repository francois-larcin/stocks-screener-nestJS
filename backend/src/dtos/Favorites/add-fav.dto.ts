import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

//* CLient vers mon API
//? Ajouter / Retirer une action d'une liste favoris
//? Un seul format pour deux actions différentes suffit dans le sens entrée vers API
export class AddDeleteFavoriteDto {
  @IsString()
  @Length(1, 10)
  @IsAlphanumeric()
  @Transform(({ value }) => String(value).trim().toUpperCase())
  symbol!: string;
}
