import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

interface Genre {
  id: number,
  name: string
}

interface Movie {
  id: number,
  title: string,
  posterPath: string,
  genreIds: number[]
}

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    movieDetail: null as any,
    genres: [] as Genre[]
  }),
  actions: {
    async fetchMovies (pages = 5) {
      this.movies = [] // Resetear las películas antes de cargar nuevas
      const movieIds = new Set<number>() // Usar un set para evitar duplicados

      try {
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/popular`, {
            params: { api_key: apiKey, page }
          })
          console.log(`API Response for page ${page}:`, response.data)

          response.data.results.forEach((movie: any) => {
            if (!movieIds.has(movie.id)) {
              movieIds.add(movie.id)
              this.movies.push({
                id: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                genreIds: movie.genre_ids
              })
            }
          })
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async fetchGenres() {
      try {
        const response = await axios.get(`${apiUrl}/genre/movie/list`, {
          params: { api_key: apiKey }
        })
        this.genres = response.data.genres
        console.log('Genres:', this.genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    },
    async fetchMovieDetail(id: number) {
      try {
        const response = await axios.get(`${apiUrl}/movie/${id}`, {
          params: { api_key: apiKey }
        })
        this.movieDetail = response.data
      } catch (error) {
        console.error('Error fetching movie detail:', error)
      }
    },
    getMoviesByGenre(genreId: number): Movie[] {
      return this.movies.filter(movie => movie.genreIds.includes(genreId))
    }
  }
})






