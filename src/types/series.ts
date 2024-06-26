/* eslint-disable camelcase */
export interface Series {
    id: number;
    name: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
    first_air_date: string;
    vote_average: number;
    original_language?: string; // Añadido
    status?: string; // Añadido
  }
  /* eslint-enable camelcase */
