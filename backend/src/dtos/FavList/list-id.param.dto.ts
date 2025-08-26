// src/dtos/params/list-id.param.dto.ts
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

//*  Client --> Mon API
//? Supprimer une liste de favoris par son ID
//? ET AUSSI retourner UNE SEULE liste sa

export class ListIdParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;
}
