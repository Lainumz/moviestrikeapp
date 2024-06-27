import { defineStore } from 'pinia'
import axios from 'axios'
import type { Series } from '@/types/series'
import type { Recommendation } from '@/types/recommendation'
import type { Trailer } from '@/types/trailer'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useSeriesStore = defineStore('seriesStore', {
  state: () => ({
    series: [] as Series[],
    seriesDetail: null as Series | null,
    recommendations: [] as Recommendation[],
    trailers: [] as Trailer[]
  }),
  actions: {
    async fetchSeries (pages: number) {
      try {
        const allSeries: Series[] = []
        const seriesIds = new Set<number>()
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/tv/popular`, {
            params: { api_key: apiKey, page }
          })
          response.data.results.forEach((serie: Series) => {
            if (!seriesIds.has(serie.id) && serie.poster_path) {
              seriesIds.add(serie.id)
              allSeries.push(serie)
            }
          })
        }
        this.series = allSeries
      } catch (error) {
        console.error('Error fetching series:', error)
      }
    },
    async fetchSeriesDetail (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/tv/${id}`, {
          params: { api_key: apiKey }
        })
        this.seriesDetail = response.data
      } catch (error) {
        console.error('Error fetching series detail:', error)
      }
    },
    async fetchRecommendations (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/tv/${id}/recommendations`, {
          params: { api_key: apiKey }
        })
        this.recommendations = response.data.results
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    },
    async fetchTrailers (id: number) {
      try {
        const response = await axios.get(`${apiUrl}/tv/${id}/videos`, {
          params: { api_key: apiKey }
        })
        const trailers = response.data.results.filter((video: Trailer) => video.type === 'Trailer')
        this.trailers = trailers.slice(0, 1)
      } catch (error) {
        console.error('Error fetching trailers:', error)
      }
    },
    getSeriesByGenre (genreId: number) {
      return this.series.filter(serie => serie.genre_ids.includes(genreId))
    }
  }
})
