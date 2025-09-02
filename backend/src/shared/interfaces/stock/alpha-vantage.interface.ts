//? --- OVERVIEW ---
//* Fiche individuelle d'une action avec ses ratios financier
export interface AlphaVantageOverview {
  Symbol?: string;
  Name?: string;
  Sector?: string;
  Industry?: string;
  MarketCapitalization?: string;
  Currency?: string;
  Exchange?: string;
  PERatio?: string;
  PriceToBookRatio?: string;
  PriceToSalesRatioTTM?: string;
  ReturnOnEquityTTM?: string;
  ReturnOnAssetsTTM?: string;
  ProfitMargin?: string;
  DebtToEquityTTM?: string;
  DividendYield?: string;
  // parfois AV renvoie aussi "Note"/"Information" en cas de quota/erreur
  Note?: string;
  Information?: string;
  'Error Message'?: string;
}

//? --- SYMBOL_SEARCH ---
//* Obtenir une liste de correspondance lors de la recherche d'actions
export interface AlphaVantageSymbolSearchItem {
  '1. symbol': string;
  '2. name': string;
  '3. type'?: string;
  '4. region': string;
  '5. marketOpen'?: string;
  '6. marketClose'?: string;
  '7. timezone'?: string;
  '8. currency': string;
  '9. matchScore': string;
}

//*Trouver des tickers à partir d'un mot-clé
export interface AlphaVantageSymbolSearchResponse {
  //* bestMatches contient une liste d'actions correspondantes
  bestMatches?: AlphaVantageSymbolSearchItem[];
  Note?: string;
  Information?: string;
  'Error Message'?: string;
}

//? --- TIME_SERIES_DAILY_ADJUSTED ---
//* Obtenir les prix journaliers d’un actif (open, close, volume, etc.)
//* Décrit une journée de cotation
export interface AlphaVantageDailyBar {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close'?: string;
  '6. volume': string;
  '7. dividend amount'?: string;
  '8. split coefficient'?: string;
}

//*Regroupe toutes les journées
export interface AlphaVantageDailyAdjustedResponse {
  'Time Series (Daily)'?: Record<string, AlphaVantageDailyBar>; // date ISO -> bar
  'Meta Data'?: Record<string, string>;
  Note?: string;
  Information?: string;
  'Error Message'?: string;
}
