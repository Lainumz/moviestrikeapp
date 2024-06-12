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
          <div v-for="movie in filteredMovies" :key="movie.id" class="movie">
            <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
              <div class="tooltip">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
                <span class="tooltiptext">{{ movie.title }}</span>
              </div>
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
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'

const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movies = ref<Movie[]>(movieStore.movies)
const genres = ref(genreStore.genres)
const filteredMovies = ref<Movie[]>(movieStore.movies)
const selectedGenre = ref<number | string>('')
const loading = ref(true)

const filterMovies = () => {
  if (selectedGenre.value) {
    filteredMovies.value = movieStore.getMoviesByGenre(Number(selectedGenre.value))
  } else {
    filteredMovies.value = movieStore.movies
  }
}

onMounted(async () => {
  await genreStore.fetchGenres()
  await movieStore.fetchMovies(10) // Ajusta el número de páginas que deseas obtener para más variedad
  genres.value = genreStore.genres
  movies.value = movieStore.movies
  filteredMovies.value = movieStore.movies
  loading.value = false
})
</script>

  <style scoped>
  .movies {
    margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
    color: white;
  }

  .genre-select {
    margin-bottom: 20px;
  }

  .genre-select label {
    margin-right: 10px;
    color: white;
  }

  .genre-select select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #333;
    color: white;
  }

  .genre-select select option {
    background-color: #333;
    color: white;
  }

  .movie {
    display: inline-block;
    margin: 10px;
    text-align: center;
    position: relative;
  }

  .movie img {
    width: 200px;
    height: 300px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
  }

  .movie img:hover {
    transform: scale(1.05);
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltiptext {
    visibility: hidden;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 105%; /* Posición encima de la imagen */
    left: 50%;
    margin-left: -100px; /* Centrar el tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #444;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }

  h1 {
    color: white;
  }
  </style>
