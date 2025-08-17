// src/dtos/params/list-id.param.dto.ts
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

//*  Client --> Mon API
//? Supprimer une liste de favoris par son ID

export class ListIdParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;
}
