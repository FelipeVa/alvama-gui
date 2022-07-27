export type ForecastType = {
  id: number;
  name: string;
  items: ForecastItemType[];
  created_at: string;
};

export type ForecastItemType = {
  id: number;
  name: string;
  value: number;
  created_at: string;
};
