<template>
  <div class="movies">
    <h1>Películas</h1>
    <div v-if="loading">Loading movies...</div>
    <div v-else>
      <div class="genre-select">
        <label for="genre">Select Genre:</label>
        <select v-model="selectedGenre" @change="filterMovies">
          <option value="" selected>All</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div v-if="filteredMovies.length">
        <div class="movies-grid">
          <div v-for="movie in paginatedMovies" :key="movie.id" class="movie">
            <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
              <div class="movie-card">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
                <div class="movie-title">{{ movie.title }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No movies available.</p>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">◀</button>
        <span v-for="page in totalPages" :key="page" :class="{'active-page': currentPage === page}" @click="goToPage(page)">
          {{ page }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">▶</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import '../assets/styles/MoviesComponent.css'

const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movies = ref<Movie[]>(movieStore.movies)
const genres = ref(genreStore.genres)
const filteredMovies = ref<Movie[]>(movieStore.movies)
const selectedGenre = ref<number | string>('')
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 40

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / itemsPerPage))

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMovies.value.slice(start, end)
})

const filterMovies = () => {
  if (selectedGenre.value) {
    filteredMovies.value = movieStore.getMoviesByGenre(Number(selectedGenre.value))
  } else {
    filteredMovies.value = movieStore.movies
  }
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

onMounted(async () => {
  await genreStore.fetchGenres()
  await movieStore.fetchMovies(10)
  genres.value = genreStore.genres
  movies.value = movieStore.movies
  filteredMovies.value = movieStore.movies
  loading.value = false
})
</script>

