export type ForecastType = {
  id: number;
  name: string;
  items: ForecastItemType[];
  created_at: string;
};

export type ForecastItemType = {
  id: number;
  name: string;
  value: string;
  created_at: string;
};

export interface CreateForecastFormValues extends Pick<ForecastType, 'name'> {
  items: Omit<ForecastItemType, 'id' | 'created_at'>[];
}
