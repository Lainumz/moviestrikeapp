<template>
  <div class="background-wrapper" :style="backgroundStyle">
    <div v-if="movie" class="movie-detail">
      <button @click="goBack" class="back-button">Back</button>
      <div class="content">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
        </div>
        <div class="details">
          <h1>{{ movie.title }}</h1>
          <p class="overview">{{ movie.overview }}</p>
          <p class="additional-info">
            <span>Genres: </span>
            <span v-if="genres.length">
              <span v-for="(genre, index) in genres" :key="genre.id">{{ genre.name }}<span v-if="index < genres.length - 1">, </span></span>
            </span>
            <span v-else>No genres available</span>
          </p>
          <p class="additional-info"><span>Release Date: </span>{{ movie.release_date }}</p>
          <p class="rating"><span>Rating: </span>{{ movie.vote_average }}/10</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/movies'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import type { Genre } from '@/types/genres'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movie = ref<Movie | null>(null)
const genres = ref<Genre[]>([])

const goBack = () => {
  router.back()
}

onMounted(async () => {
  const movieId = route.params.id
  if (movieId) {
    await genreStore.fetchGenres() // Fetch genres here
    await movieStore.fetchMovieDetail(Number(movieId))
    movie.value = movieStore.movieDetail
    if (movie.value && movie.value.genre_ids) {
      genres.value = genreStore.genres.filter(genre => movie.value?.genre_ids?.includes(genre.id))
    }
  }
})

watch([movie, genreStore.genres], () => {
  if (movie.value && genreStore.genres.length && movie.value.genre_ids) {
    genres.value = genreStore.genres.filter(genre => movie.value?.genre_ids?.includes(genre.id))
  }
})

const backgroundStyle = computed(() => (
  movie.value
    ? {
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.value.poster_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat'
      }
    : {}
))
</script>

<style scoped>
.background-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed; /* Fijar el fondo para que se vea mejor al hacer scroll */
}

.background-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Ajustar el valor de opacidad para más o menos contraste */
  z-index: 1;
}

.movie-detail {
  margin: 0; /* Eliminar el margen */
  padding: 20px; /* Ajustar el padding si es necesario */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2; /* Asegurar que el contenido esté por encima del overlay */
}

.content {
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 2; /* Asegurar que el contenido esté por encima del overlay */
}

.poster {
  margin-right: 40px;
}

.poster img {
  width: 300px;
  height: 450px;
}

.details {
  flex: 1;
  max-width: 500px;
  text-align: left;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.overview {
  margin-bottom: 20px;
}

.additional-info {
  margin-bottom: 10px;
}

.rating {
  margin-top: 10px;
  font-weight: bold;
}

.back-button {
  align-self: flex-start;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  cursor: pointer;
  z-index: 2; /* Asegurar que el botón esté por encima del overlay */
}

.back-button:hover {
  background-color: #555;
}
</style>
