<template>
    <div>
      <h1>Movie List</h1>
      <div v-if="loading">Loading movies and genres...</div>
      <div v-else>
        <div>
          <label for="genre">Select Genre:</label>
          <select v-model="selectedGenre" @change="filterMovies">
            <option value="" selected>All</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div v-if="filteredMovies.length">
          <div v-for="movie in filteredMovies" :key="movie.id" class="movie">
            <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" :alt="movie.title" />
              <h2>{{ movie.title }}</h2>
            </router-link>
          </div>
        </div>
        <div v-else>
          <p>No movies available.</p>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store'

const movieStore = useMovieStore()
const movies = ref(movieStore.movies)
const genres = ref(movieStore.genres)
const filteredMovies = ref(movieStore.movies)
const selectedGenre = ref<number | string>('')

const filterMovies = () => {
  if (selectedGenre.value) {
    filteredMovies.value = movieStore.getMoviesByGenre(Number(selectedGenre.value))
  } else {
    filteredMovies.value = movieStore.movies
  }
}
const loading = ref(true)

onMounted(async () => {
  await movieStore.fetchMovies(10) // Ajusta el número de páginas que deseas obtener para más variedad
  await movieStore.fetchGenres()
  movies.value = movieStore.movies
  genres.value = movieStore.genres
  filteredMovies.value = movieStore.movies
  loading.value = false
})
</script>

  <style scoped>
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
