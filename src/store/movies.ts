import { defineStore } from 'pinia'
import axios from 'axios'
import type { Movie } from '@/types/movie'
import type { Recommendation } from '@/types/recommendation'
import type { Trailer } from '@/types/trailer'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    movieDetail: null as Movie | null,
    searchResults: [] as Movie[],
    newReleases: [] as Movie[],
    recommendations: [] as Recommendation[],
    trailers: [] as Trailer[]
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
    async fetchNewReleases () {
      try {
        const response = await axios.get(`${apiUrl}/movie/now_playing`, {
          params: { api_key: apiKey }
        })
        this.newReleases = response.data.results.slice(0, 10)
      } catch (error) {
        console.error('Error fetching new releases:', error)
      }
    },
    async fetchRecommendations (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/movie/${id}/recommendations`, {
          params: { api_key: apiKey }
        })
        this.recommendations = response.data.results
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    },
    async fetchTrailers (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/movie/${id}/videos`, {
          params: { api_key: apiKey }
        })
        const trailers = response.data.results.filter((video: Trailer) => video.type === 'Trailer')
        this.trailers = trailers.slice(0, 1)
      } catch (error) {
        console.error('Error fetching trailers:', error)
      }
    },
    getMoviesByGenre (genreId: number) {
      return this.movies.filter(movie => movie.genre_ids.includes(genreId))
    }
  }
})
