//* Mon API --> Client
//? Retourner une liste de favoris sans entrer dans le détail

export class FavListSummaryDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  count!: number;
}
