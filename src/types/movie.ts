/* eslint-disable camelcase */
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  original_language?: string;
  status?: string;
}
/* eslint-enable camelcase */
