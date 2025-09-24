export interface TvResult {
  id: number;
  name: string;               // título
  overview: string;
  poster_path: string | null;
  vote_average: number;       // 0..10
  vote_count: number;
  first_air_date?: string;
}

export interface TmdbPagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
