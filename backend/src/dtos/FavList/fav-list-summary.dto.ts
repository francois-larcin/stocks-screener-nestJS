//* Mon API --> Client
//? Retourner des listes de favoris sans détail des actions les composant

export class FavListSummaryDto {
  id!: number;
  name!: string;
  createdAt!: Date;
  count!: number;
}
