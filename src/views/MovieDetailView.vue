<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store'

const route = useRoute()
const movieStore = useMovieStore()
const movieId = route.params.id as string

onMounted(() => {
  movieStore.fetchMovieDetail(Number(movieId))
})

const movie = movieStore.movieDetail
</script>
