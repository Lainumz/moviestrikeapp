<template>
  <div v-if="series" class="series-detail">
    <h1>{{ series.name }}</h1>
    <img :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name" />
    <p>{{ series.overview }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSeriesStore } from '@/store/series'
import type { Series } from '@/types/series'

const route = useRoute()
const seriesStore = useSeriesStore()
const series = ref<Series | null>(null)

onMounted(async () => {
  const seriesId = route.params.id
  if (seriesId) {
    await seriesStore.fetchSeriesDetail(Number(seriesId))
    series.value = seriesStore.seriesDetail
  }
})
</script>

<style scoped>
.series-detail {
  margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
  color: white;
  text-align: center;
}

.series-detail img {
  width: 300px;
  height: 450px;
  margin: 20px 0;
}
</style>
