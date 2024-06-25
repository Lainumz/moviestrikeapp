<template>
  <div class="movie-list">
    <h1>Películas</h1>
    <div v-if="loading">Loading movies and genres...</div>
    <div v-else>
      <MovieSwiper :items="featuredMovies" title="Película Destacada" :isSerie="false" :featured="true" />
      <div class="category">
        <MovieSwiper :items="mostViewedMovies" title="Más Visto" :isSerie="false" :featured="false" />
      </div>
      <div class="category">
        <MovieSwiper :items="popularMovies" title="Populares" :isSerie="false" :featured="false" />
      </div>
      <div class="category">
        <MovieSwiper :items="recommendedMovies" title="Recomendado" :isSerie="false" :featured="false" />
      </div>
    </div>
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import type { Genre } from '@/types/genres'

import MovieSwiper from '@/components/MovieSwiper.vue'
import '../assets/styles/MovieList.css'

const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movies = ref<Movie[]>([])
const genres = ref<Genre[]>([])
const loading = ref(true)

const featuredMovies = ref<Movie[]>([])
const mostViewedMovies = ref<Movie[]>([])
const popularMovies = ref<Movie[]>([])
const recommendedMovies = ref<Movie[]>([])

onMounted(async () => {
  await genreStore.fetchGenres()
  await movieStore.fetchMovies(10)
  genres.value = genreStore.genres
  movies.value = movieStore.movies

  featuredMovies.value = movieStore.movies.slice(0, 5)
  mostViewedMovies.value = movieStore.movies.slice(5, 17)
  popularMovies.value = movieStore.movies.slice(17, 29)
  recommendedMovies.value = movieStore.movies.slice(29, 41)

  loading.value = false
})
</script>

<style>
/* Aquí puedes agregar los estilos específicos para tu componente Home si es necesario */
</style>
