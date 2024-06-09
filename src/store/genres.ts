import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

interface Genre {
  id: number,
  name: string
}

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
        console.log('Genres:', this.genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
  }
})
