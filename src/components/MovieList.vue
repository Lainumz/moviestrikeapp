<template>
  <div class="movie-list">
    <h1>Películas</h1>
    <div v-if="loading">Loading movies and genres...</div>
    <div v-else>
      <div class="category">
        <h2>Más Visto</h2>
        <MovieSwiper :items="mostViewedMovies" title="Más Visto" />
      </div>
      <div class="category">
        <h2>Populares</h2>
        <MovieSwiper :items="popularMovies" title="Populares" />
      </div>
      <div class="category">
        <h2>Recomendado</h2>
        <MovieSwiper :items="recommendedMovies" title="Recomendado" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import type { Genre } from '@/types/genres' // Define el tipo Genre

// Importa MovieSwiper
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
  await movieStore.fetchMovies(10) // Ajusta el número de páginas que deseas obtener para más variedad
  genres.value = genreStore.genres
  movies.value = movieStore.movies

  // Simular propiedades y categorizar películas (ajusta las condiciones según tu lógica)
  mostViewedMovies.value = movieStore.movies.slice(0, 12) // Asegúrate de que haya suficientes películas
  popularMovies.value = movieStore.movies.slice(12, 24) // Asegúrate de que haya suficientes películas
  recommendedMovies.value = movieStore.movies.slice(24, 36) // Asegúrate de que haya suficientes películas

  loading.value = false
})
</script>

<style scoped>
.movie-list {
  margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
  color: white;
}

.category {
  margin-bottom: 40px;
}

h1, h2 {
  color: white;
}
</style>
