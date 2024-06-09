import { createPinia } from 'pinia'

// Importa los stores específicos
import { useMovieStore } from './movies'
import { useGenreStore } from './genres'
import { useTopRatedStore } from './topRated'

// Crea una instancia de Pinia
const pinia = createPinia()

// Exporta la instancia de Pinia y los stores
export { pinia, useMovieStore, useGenreStore, useTopRatedStore }
