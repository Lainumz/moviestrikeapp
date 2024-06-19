<template>
  <div class="movie-list">
    <h1>Películas</h1>
    <div v-if="loading">Loading movies and genres...</div>
    <div v-else>
      <div class="category">
        <MovieSwiper :items="mostViewedMovies" title="Más Visto" :isSerie="false" />
      </div>
      <div class="category">
        <MovieSwiper :items="popularMovies" title="Populares" :isSerie="false" />
      </div>
      <div class="category">
        <MovieSwiper :items="recommendedMovies" title="Recomendado" :isSerie="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import type { Genre } from '@/types/genres'

import MovieSwiper from '@/components/MovieSwiper.vue'

const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movies = ref<Movie[]>([])
const genres = ref<Genre[]>([])
const loading = ref(true)

const mostViewedMovies = ref<Movie[]>([])
const popularMovies = ref<Movie[]>([])
const recommendedMovies = ref<Movie[]>([])

onMounted(async () => {
  await genreStore.fetchGenres()
  await movieStore.fetchMovies(10)
  genres.value = genreStore.genres
  movies.value = movieStore.movies

  mostViewedMovies.value = movieStore.movies.slice(0, 12)
  popularMovies.value = movieStore.movies.slice(12, 24)
  recommendedMovies.value = movieStore.movies.slice(24, 36)

  loading.value = false
})
</script>

<style scoped>
.movie-list {
  margin-top: 80px;
  color: white;
}

.category {
  margin-bottom: 40px;
}

h1, h2 {
  color: white;
}
</style>
