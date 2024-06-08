<template>
  <div>
    <h1>Popular Movies</h1>
    <div v-if="loading">Loading movies...</div>
    <div v-else-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
          <h2>{{ movie.title }}</h2>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No movies available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store'

const movieStore = useMovieStore()
const movies = ref(movieStore.movies)
const loading = ref(true)

onMounted(async () => {
  await movieStore.fetchMovies(5)
  movies.value = movieStore.movies
  loading.value = false
})
</script>

<style>
.movie {
  display: inline-block;
  margin: 10px;
  text-align: center;
}
.movie img {
  width: 200px;
  height: 300px;
}
</style>
