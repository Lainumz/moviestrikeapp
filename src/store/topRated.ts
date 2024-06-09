import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

interface Movie {
  id: number,
  title: string,
  posterPath: string,
  genreIds: number[]
}

export const useTopRatedStore = defineStore('topRatedStore', {
  state: () => ({
    topRatedMovies: [] as Movie[]
  }),
  actions: {
    async fetchTopRatedMovies (pages = 5) {
      this.topRatedMovies = [] // Resetear las películas antes de cargar nuevas
      const movieIds = new Set<number>() // Usar un set para evitar duplicados

      try {
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/top_rated`, {
            params: { api_key: apiKey, page }
          })
          console.log(`API Response for page ${page}:`, response.data)

          response.data.results.forEach((movie: any) => {
            if (!movieIds.has(movie.id)) {
              movieIds.add(movie.id)
              this.topRatedMovies.push({
                id: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                genreIds: movie.genre_ids
              })
            }
          })
        }
      } catch (error) {
        console.error('Error fetching top rated movies:', error)
      }
    }
  }
})
