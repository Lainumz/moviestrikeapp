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
      <div class="trailers" v-if="trailers.length">
        <h2>Trailer</h2>
        <div v-for="trailer in trailers" :key="trailer.id" class="trailer">
          <iframe
            :src="'https://www.youtube.com/embed/' + trailer.key"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <p>{{ trailer.name }}</p>
        </div>
      </div>
      <div class="recommendations" v-if="recommendations.length">
        <h2>Recommended Series</h2>
        <ul>
          <li v-for="recommendation in recommendations" :key="recommendation.id">
            <router-link :to="{ name: 'seriesDetail', params: { id: recommendation.id }}">
              <img :src="'https://image.tmdb.org/t/p/w200' + recommendation.poster_path" :alt="recommendation.title || recommendation.title" />
              <p class="title">{{ recommendation.title || recommendation.title }}</p>
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
import { useSeriesStore } from '@/store/series'
import { useGenreStore } from '@/store/genres'
import type { Series } from '@/types/series'
import type { Genre } from '@/types/genres'
import type { Recommendation } from '@/types/recommendation'
import type { Trailer } from '@/types/trailer' // Importar el nuevo tipo

const route = useRoute()
const router = useRouter()
const seriesStore = useSeriesStore()
const genreStore = useGenreStore()
const series = ref<Series | null>(null)
const genres = ref<Genre[]>([])
const recommendations = ref<Recommendation[]>([])
const trailers = ref<Trailer[]>([]) // Definir la variable de trailers

const goBack = () => {
  router.back()
}

const fetchSeriesDetails = async (seriesId: number) => {
  await seriesStore.fetchSeriesDetail(seriesId)
  series.value = seriesStore.seriesDetail
  await genreStore.fetchSeriesGenres()
  if (series.value && series.value.genre_ids) {
    genres.value = genreStore.genres.filter(genre => series.value?.genre_ids?.includes(genre.id))
  }
  await seriesStore.fetchRecommendations(seriesId)
  recommendations.value = seriesStore.recommendations
  await seriesStore.fetchTrailers(seriesId) // Obtener trailers
  trailers.value = seriesStore.trailers
}

onMounted(() => {
  const seriesId = route.params.id
  if (seriesId) {
    fetchSeriesDetails(Number(seriesId))
  }
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchSeriesDetails(Number(newId))
  }
})

const backgroundStyle = computed(() => (
  series.value
    ? {
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${series.value.poster_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
  background-attachment: fixed;
}

.background-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.series-detail {
  margin: 0;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.content {
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 2;
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

.trailers {
  margin-top: 40px;
  text-align: center;
}

.trailers .trailer {
  margin-bottom: 20px;
}

.trailers iframe {
  width: 100%;
  height: 300px; /* Ajustar la altura para mantener la relación de aspecto 16:9 */
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
  position: relative;
}

.recommendations img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}

.recommendations .title {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.recommendations li:hover .title {
  display: block;
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
  z-index: 2;
}

.back-button:hover {
  background-color: #555;
}

.recommendations a {
  text-decoration: none;
  color: inherit;
}
</style>
