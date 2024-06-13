import { defineStore } from 'pinia'
import axios from 'axios'
import type { Series } from '@/types/series'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

export const useSeriesStore = defineStore('seriesStore', {
  state: () => ({
    series: [] as Series[],
    seriesDetail: null as Series | null
  }),
  actions: {
    async fetchSeries (pages: number) {
      try {
        const allSeries = []
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/tv/popular`, {
            params: { api_key: apiKey, page }
          })
          allSeries.push(...response.data.results)
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
    getSeriesByGenre (genreId: number) {
      return this.series.filter(serie => serie.genre_ids.includes(genreId))
    }
  }
})
