import { createPinia } from 'pinia'
import { useMovieStore } from './movies'
import { useGenreStore } from './genres'
import { useSeriesStore } from './series' // Asegúrate de importar el nuevo store de series

// Crea una instancia de Pinia
const pinia = createPinia()

// Exporta la instancia de Pinia y los stores
export { pinia, useMovieStore, useGenreStore, useSeriesStore }
