//? v = valeur brute
//? o = objet
//? anyO = un objet unknown dont on sait qu'il possède des propriétés de type string et des valeurs correspondantes de type unknown

//* S'assurer qu'une valeur est bien numérique et cohérente
//* Renvoit 0 en cas d'échec et évite les NaN
export const toNum = (v?: string | null): number => {
  if (v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

//* Convertir une valeur textuelle en nombre, tout en préservant le null si la donnée est invalide

export const toNumOrNull = (v?: string | null): number | null => {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

//* Retourner la date du jour au format YYYY-MM-DD,
export const todayStr = (): string => new Date().toISOString().slice(0, 10);

//* Vérifier le type de réponse de Vantage-Alpha
//* Valider le type de donnée avant de consulter son contenu en froçant le typage clé/valeur
export const isAvError = (
  o: unknown,
): o is { Note?: string; Information?: string; 'Error Message'?: string } => {
  if (!o || typeof o !== 'object') return false;
  //*“Je sais que cet objet a des clés de type chaîne, et je veux y accéder dynamiquement.”
  const anyO = o as Record<string, unknown>;
  return !!(anyO['Note'] || anyO['Information'] || anyO['Error Message']);
};
