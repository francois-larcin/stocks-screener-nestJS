// src/mappers/favorites/favorite-action.mapper.ts

import {
  FavAddedResultDto,
  FavListClearedResultDto,
  FavListDeletedResultDto,
  FavRemovedResultDto,
} from 'src/dtos/favorites/fav-action-result.dto';

export const addedResult = (listId: number, symbol: string, added: boolean): FavAddedResultDto => ({
  ok: true,
  added,
  symbol,
  listId,
});

export const removedResult = (
  listId: number,
  symbol: string,
  removed: boolean,
): FavRemovedResultDto => ({
  ok: true,
  removed,
  symbol,
  listId,
});

export const clearedResult = (listId: number, cleared: number): FavListClearedResultDto => ({
  ok: true,
  cleared,
  listId,
});

export const listDeletedResult = (listId: number, deleted: boolean): FavListDeletedResultDto => ({
  ok: true,
  deleted,
  listId,
});
