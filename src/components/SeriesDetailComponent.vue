<template>
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
          <span>Genres: </span><span v-for="(genre, index) in genres" :key="genre.id">{{ genre.name }}<span v-if="index < genres.length - 1">, </span></span>
        </p>
        <p class="additional-info"><span>First Air Date: </span>{{ series.first_air_date }}</p>
        <p class="rating"><span>Rating: </span>{{ series.vote_average }}/10</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
    if (series.value) {
      genres.value = genreStore.genres.filter(genre => series.value?.genre_ids?.includes(genre.id))
    }
  }
})
</script>

<style scoped>
.series-detail {
  margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

.back-button:hover {
  background-color: #555;
}

.content {
  display: flex;
  width: 100%;
  justify-content: center;
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
</style>
