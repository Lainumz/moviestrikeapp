import { defineStore } from 'pinia'
import axios from 'axios'
import type { Genre } from '@/types/genres'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useGenreStore = defineStore('genreStore', {
  state: () => ({
    genres: [] as Genre[]
  }),
  actions: {
    async fetchGenres () {
      try {
        const response = await axios.get(`${apiUrl}/genre/movie/list`, {
          params: { api_key: apiKey }
        })
        this.genres = response.data.genres
        console.log('Genres fetched:', this.genres) // Para verificar que los géneros se obtienen correctamente
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    },
    async fetchSeriesGenres () {
      try {
        const response = await axios.get(`${apiUrl}/genre/tv/list`, {
          params: { api_key: apiKey }
        })
        this.genres = response.data.genres
        console.log('Series genres fetched:', this.genres) // Para verificar que los géneros de series se obtienen correctamente
      } catch (error) {
        console.error('Error fetching series genres:', error)
      }
    }
  }
})
