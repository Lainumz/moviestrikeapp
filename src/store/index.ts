import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Array<any>,
    movieDetail: null as any
  }),
  actions: {
    async fetchMovies (pages = 5) {
      this.movies = [] // Resetear las películas antes de cargar nuevas
      try {
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/popular`, {
            params: { api_key: apiKey, page }
          })
          console.log(`API Response for page ${page}:`, response.data)
          this.movies.push(...response.data.results)
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async fetchMovieDetail (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/movie/${id}`, {
          params: { api_key: apiKey }
        })
        this.movieDetail = response.data
      } catch (error) {
        console.error('Error fetching movie detail:', error)
      }
    }
  }
})





