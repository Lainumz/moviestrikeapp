import { defineStore } from 'pinia'
import axios from 'axios'
import type { Movie } from '@/types/movie'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    movieDetail: null as Movie | null,
    searchResults: [] as Movie[],
    newReleases: [] as Movie[]
  }),
  actions: {
    async fetchMovies (pages: number) {
      try {
        const allMovies: Movie[] = []
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/popular`, {
            params: { api_key: apiKey, page }
          })
          allMovies.push(...response.data.results)
        }
        this.movies = allMovies
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
    },
    async searchMovies (query: string) {
      try {
        const response = await axios.get(`${apiUrl}/search/movie`, {
          params: { api_key: apiKey, query }
        })
        this.searchResults = response.data.results
      } catch (error) {
        console.error('Error searching movies:', error)
      }
    },
    async fetchNewReleases (pages: number) {
      try {
        const allNewReleases: Movie[] = []
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/now_playing`, {
            params: { api_key: apiKey, page }
          })
          allNewReleases.push(...response.data.results)
        }
        this.newReleases = allNewReleases
      } catch (error) {
        console.error('Error fetching new releases:', error)
      }
    },
    getMoviesByGenre (genreId: number) {
      return this.movies.filter(movie => movie.genre_ids.includes(genreId))
    }
  }
})
