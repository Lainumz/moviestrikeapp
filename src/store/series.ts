import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = process.env.VUE_APP_TMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3'

interface Series {
  id: number,
  title: string,
  posterPath: string,
  genreIds: number[]
}

export const useSeriesStore = defineStore('seriesStore', {
  state: () => ({
    series: [] as Series[],
    seriesDetail: null as any
  }),
  actions: {
    async fetchSeries (pages = 5) {
      this.series = [] // Resetear las series antes de cargar nuevas
      const seriesIds = new Set<number>() // Usar un set para evitar duplicados

      try {
        for (let page = 1; page <= pages; page++) {
          const response = await axios.get(`${apiUrl}/tv/popular`, {
            params: { api_key: apiKey, page }
          })
          console.log(`API Response for page ${page}:`, response.data)

          response.data.results.forEach((serie: any) => {
            if (!seriesIds.has(serie.id)) {
              seriesIds.add(serie.id)
              this.series.push({
                id: serie.id,
                title: serie.name,
                posterPath: serie.poster_path,
                genreIds: serie.genre_ids
              })
            }
          })
        }
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
    getSeriesByGenre (genreId: number): Series[] {
      return this.series.filter(serie => serie.genreIds.includes(genreId))
    }
  }
})
