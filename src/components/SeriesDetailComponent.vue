<template>
  <div class="background-wrapper" :style="backgroundStyle">
    <div v-if="series" class="series-detail">
      <button @click="goBack" class="back-button">Back</button>
      <div class="content">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name" />
        </div>
        <div class="details">
          <h1>{{ series.name }}</h1>
          <p class="overview">{{ series.overview }}</p>
          <p class="additional-info">
            <span>Genres: </span>
            <span v-if="genres.length">
              <span v-for="(genre, index) in genres" :key="genre.id">{{ genre.name }}<span v-if="index < genres.length - 1">, </span></span>
            </span>
            <span v-else>No genres available</span>
          </p>
          <p class="additional-info"><span>First Air Date: </span>{{ series.first_air_date }}</p>
          <p class="rating"><span>Rating: </span>{{ series.vote_average }}/10</p>
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
import { useSeriesStore } from '@/store/series'
import { useGenreStore } from '@/store/genres'
import type { Series } from '@/types/series'
import type { Genre } from '@/types/genres'

const route = useRoute()
const router = useRouter()
const seriesStore = useSeriesStore()
const genreStore = useGenreStore()
const series = ref<Series | null>(null)
const genres = ref<Genre[]>([])

const goBack = () => {
  router.back()
}

onMounted(async () => {
  const seriesId = route.params.id
  if (seriesId) {
    await seriesStore.fetchSeriesDetail(Number(seriesId))
    series.value = seriesStore.seriesDetail
    await genreStore.fetchSeriesGenres() // Fetch series genres here
  }
})

watch([series, genreStore.genres], () => {
  if (series.value && genreStore.genres.length) {
    genres.value = genreStore.genres.filter(genre => series.value?.genre_ids?.includes(genre.id))
  }
})

const backgroundStyle = computed(() => (
  series.value
    ? {
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${series.value.poster_path}')`,
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

.series-detail {
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
