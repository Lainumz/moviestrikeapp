<template>
  <div class="background-wrapper" :style="backgroundStyle">
    <div v-if="entity" class="entity-detail">
      <button @click="goBack" class="back-button">Back</button>
      <div class="content">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500' + entity.poster_path" :alt="entityTitle" />
        </div>
        <div class="details">
          <h1>{{ entityTitle }}</h1>
          <p class="overview">{{ entity.overview }}</p>
          <p class="additional-info">
            <span>Genres: </span>
            <span v-if="genres.length">
              <span v-for="(genre, index) in genres" :key="genre.id">{{ genre.name }}<span v-if="index < genres.length - 1">, </span></span>
            </span>
            <span v-else>No genres available</span>
          </p>
          <p class="additional-info">
            <span>{{ isMovie ? 'Release Date: ' : 'First Air Date: ' }}</span>{{ entityDate }}
          </p>
          <p class="rating"><span>Rating: </span>{{ entity.vote_average }}/10</p>
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
        <h2>Recommended {{ isMovie ? 'Movies' : 'Series' }}</h2>
        <ul>
          <li v-for="recommendation in recommendations" :key="recommendation.id">
            <router-link :to="{ name: isMovie ? 'movieDetail' : 'seriesDetail', params: { id: recommendation.id }}">
              <img :src="'https://image.tmdb.org/t/p/w200' + recommendation.poster_path" :alt="recommendationTitle(recommendation)" />
              <p class="title">{{ recommendationTitle(recommendation) }}</p>
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
import { useSeriesStore } from '@/store/series'
import { useGenreStore } from '@/store/genres'
import type { Movie } from '@/types/movie'
import type { Series } from '@/types/series'
import type { Genre } from '@/types/genres'
import type { Recommendation } from '@/types/recommendation'
import type { Trailer } from '@/types/trailer'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const seriesStore = useSeriesStore()
const genreStore = useGenreStore()
const entity = ref<Movie | Series | null>(null)
const genres = ref<Genre[]>([])
const recommendations = ref<Recommendation[]>([])
const trailers = ref<Trailer[]>([])
const isMovie = ref(true)

const goBack = () => {
  router.back()
}

const fetchDetails = async (id: number) => {
  await genreStore.fetchGenres()
  if (isMovie.value) {
    await movieStore.fetchMovieDetail(id)
    entity.value = movieStore.movieDetail
    await movieStore.fetchRecommendations(id)
    recommendations.value = movieStore.recommendations
    await movieStore.fetchTrailers(id)
    trailers.value = movieStore.trailers
  } else {
    await seriesStore.fetchSeriesDetail(id)
    entity.value = seriesStore.seriesDetail
    await seriesStore.fetchRecommendations(id)
    recommendations.value = seriesStore.recommendations
    await seriesStore.fetchTrailers(id)
    trailers.value = seriesStore.trailers
  }
  if (entity.value && entity.value.genre_ids) {
    genres.value = genreStore.genres.filter(genre => entity.value?.genre_ids?.includes(genre.id))
  }
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    isMovie.value = route.name === 'movieDetail'
    fetchDetails(Number(id))
  }
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    isMovie.value = route.name === 'movieDetail'
    fetchDetails(Number(newId))
  }
})

const backgroundStyle = computed(() => (
  entity.value
    ? {
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${entity.value.poster_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {}
))

const entityTitle = computed(() => entity.value ? (isMovie.value ? (entity.value as Movie).title : (entity.value as Series).name) : '')
const entityDate = computed(() => entity.value ? (isMovie.value ? (entity.value as Movie).release_date : (entity.value as Series).first_air_date) : '')

const recommendationTitle = (recommendation: Recommendation) => {
  return isMovie.value ? recommendation.title : recommendation.name
}
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

.entity-detail {
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
