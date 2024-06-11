<template>
    <div class="movie-list">
      <h1>Películas</h1>
      <div v-if="loading">Loading movies and genres...</div>
      <div v-else>
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
const loading = ref(true)

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
  .movie-list {
    margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
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

  h1 {
    color: white;
  }
  </style>
