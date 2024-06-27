import { createPinia } from 'pinia'
import { useMovieStore } from './movies'
import { useGenreStore } from './genres'
import { useSeriesStore } from './series'

const pinia = createPinia()

export { pinia, useMovieStore, useGenreStore, useSeriesStore }
