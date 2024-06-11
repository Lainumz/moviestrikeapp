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
        let allSeries: Series[] = []
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/tv/popular`, {
            params: { api_key: apiKey, page }
          })
          const series = response.data.results.map((serie: any) => ({
            id: serie.id,
            name: serie.name,
            poster_path: serie.poster_path,
            overview: serie.overview,
            genre_ids: serie.genre_ids
          }))
          allSeries = allSeries.concat(series)
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
        this.seriesDetail = {
          id: response.data.id,
          name: response.data.name,
          poster_path: response.data.poster_path,
          overview: response.data.overview,
          genre_ids: response.data.genres.map((genre: any) => genre.id)
        }
      } catch (error) {
        console.error('Error fetching series detail:', error)
      }
    },
    getSeriesByGenre (genreId: number) {
      return this.series.filter(serie => serie.genre_ids.includes(genreId))
    }
  }
})
