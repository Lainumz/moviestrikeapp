import { defineStore } from 'pinia'
import axios from 'axios'
import type { Movie } from '@/types/movie'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    newReleases: [] as Movie[],
    movieDetail: null as Movie | null,
    searchResults: [] as Movie[]
  }),
  actions: {
    async fetchMovies (pages: number) {
      try {
        let allMovies: Movie[] = []
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/movie/popular`, {
            params: { api_key: apiKey, page }
          })
          const movies = response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            genre_ids: movie.genre_ids
          }))
          allMovies = allMovies.concat(movies)
        }
        this.movies = allMovies
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async fetchNewReleases () {
      try {
        const response = await axios.get(`${apiUrl}/movie/now_playing`, {
          params: { api_key: apiKey }
        })
        this.newReleases = response.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          genre_ids: movie.genre_ids
        }))
      } catch (error) {
        console.error('Error fetching new releases:', error)
      }
    },
    async fetchMovieDetail (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/movie/${id}`, {
          params: { api_key: apiKey }
        })
        this.movieDetail = {
          id: response.data.id,
          title: response.data.title,
          poster_path: response.data.poster_path,
          overview: response.data.overview,
          genre_ids: response.data.genres.map((genre: any) => genre.id)
        }
      } catch (error) {
        console.error('Error fetching movie detail:', error)
      }
    },
    async searchMovies (query: string) {
      try {
        const response = await axios.get(`${apiUrl}/search/movie`, {
          params: { api_key: apiKey, query }
        })
        const movies = response.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          genre_ids: movie.genre_ids
        }))
        this.searchResults = movies
      } catch (error) {
        console.error('Error searching movies:', error)
      }
    },
    getMoviesByGenre (genreId: number) {
      return this.movies.filter(movie => movie.genre_ids.includes(genreId))
    }
  }
})
