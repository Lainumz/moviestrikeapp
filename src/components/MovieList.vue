<template>
  <div class="movie-list">
    <div class="introduction">
      <img src="@/assets/logo.png" alt="TMDB Logo" class="logo"/>
      <h1>Bienvenido a Moviestrike Project</h1>
      <p>Explora una vasta colección de películas proporcionadas por The Movie Database (TMDB). Disfruta de las películas más populares, las más vistas y nuestras recomendaciones personalizadas.</p>
    </div>
    <div v-if="loading" class="loading">Loading movies and genres...</div>
    <div v-else>
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

const mostViewedMovies = ref<Movie[]>([])
const popularMovies = ref<Movie[]>([])
const recommendedMovies = ref<Movie[]>([])

onMounted(async () => {
  try {
    await genreStore.fetchGenres()
    await movieStore.fetchMovies(41) // Asegúrate de pedir suficientes películas
    genres.value = genreStore.genres
    movies.value = movieStore.movies

    // Depuración
    console.log('Movies loaded:', movies.value.length)
    console.log('Movies:', movies.value)

    if (movies.value.length >= 41) {
      mostViewedMovies.value = movies.value.slice(5, 17)
      popularMovies.value = movies.value.slice(17, 29)
      recommendedMovies.value = movies.value.slice(29, 41)

      // Depuración
      console.log('Most Viewed Movies:', mostViewedMovies.value)
      console.log('Popular Movies:', popularMovies.value)
      console.log('Recommended Movies:', recommendedMovies.value)
    } else {
      // Maneja el caso en que no hay suficientes películas
      console.warn('No hay suficientes películas para llenar todas las categorías.')
    }
  } catch (error) {
    console.error('Error al cargar las películas o géneros:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style>

</style>
