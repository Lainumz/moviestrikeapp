<template>
    <div v-if="movie" class="movie-detail">
      <h1>{{ movie.title }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
      <p>{{ movie.overview }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movies'
import type { Movie } from '@/types/movie'

const route = useRoute()
const movieStore = useMovieStore()
const movie = ref<Movie | null>(null)

onMounted(async () => {
  const movieId = route.params.id
  if (movieId) {
    await movieStore.fetchMovieDetail(Number(movieId))
    movie.value = movieStore.movieDetail as Movie
  }
})
</script>

  <style scoped>
  .movie-detail {
    margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
    color: white;
    text-align: center;
  }

  .movie-detail img {
    width: 300px;
    height: 450px;
    margin: 20px 0;
  }
  </style>
