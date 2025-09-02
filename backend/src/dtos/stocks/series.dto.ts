export class PricePointDto {
  date: string;
  close: number;
}
export class SeriesResponseDto {
  points: PricePointDto[];
}
