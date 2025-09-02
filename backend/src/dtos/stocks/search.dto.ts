// dto/search.dto.ts
export class SearchItemDto {
  symbol: string;
  name: string;
  region: string;
  currency: string;
  matchScore: number;
}
export class SearchResponseDto {
  items: SearchItemDto[];
}
