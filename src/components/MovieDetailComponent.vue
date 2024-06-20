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
      <div class="recommendations" v-if="recommendations.length">
        <h2>Recommended Movies</h2>
        <ul>
          <li v-for="recommendation in recommendations" :key="recommendation.id">
            <router-link :to="{ name: 'movieDetail', params: { id: recommendation.id }}">
              <img :src="'https://image.tmdb.org/t/p/w200' + recommendation.poster_path" :alt="recommendation.title" />
              <p class="title">{{ recommendation.title }}</p>
            </router-link>
          </li>
        </ul>
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
import type { Recommendation } from '@/types/recommendation' // Importar el nuevo tipo

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const genreStore = useGenreStore()
const movie = ref<Movie | null>(null)
const genres = ref<Genre[]>([])
const recommendations = ref<Recommendation[]>([]) // Definir la variable de recomendaciones

const goBack = () => {
  router.back()
}

const fetchMovieDetails = async (movieId: number) => {
  await genreStore.fetchGenres() // Fetch genres here
  await movieStore.fetchMovieDetail(movieId)
  movie.value = movieStore.movieDetail
  if (movie.value && movie.value.genre_ids) {
    genres.value = genreStore.genres.filter(genre => movie.value?.genre_ids?.includes(genre.id))
  }
  // Fetch recommendations
  await movieStore.fetchRecommendations(movieId)
  recommendations.value = movieStore.recommendations
}

onMounted(() => {
  const movieId = route.params.id
  if (movieId) {
    fetchMovieDetails(Number(movieId))
  }
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchMovieDetails(Number(newId))
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

.recommendations {
  margin-top: 40px;
  text-align: center;
}

.recommendations ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.recommendations li {
  margin: 10px;
  text-align: center;
  position: relative; /* Añadir posición relativa */
}

.recommendations img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}

.recommendations .title {
  display: none; /* Ocultar el título por defecto */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro con algo de transparencia */
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.recommendations li:hover .title {
  display: block; /* Mostrar el título al pasar el ratón por encima */
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

.recommendations a {
  text-decoration: none;
  color: inherit;
}
</style>
