<template>
  <div class="series">
    <h1>Series</h1>
    <div v-if="loading">Loading series...</div>
    <div v-else>
      <div class="genre-select">
        <label for="genre">Select Genre:</label>
        <select v-model="selectedGenre" @change="filterSeries">
          <option value="" selected>All</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div v-if="paginatedSeries.length">
        <div v-for="serie in paginatedSeries" :key="serie.id" class="serie">
          <router-link :to="{ name: 'seriesDetail', params: { id: serie.id } }">
            <div class="serie-card">
              <img :src="'https://image.tmdb.org/t/p/w500' + serie.poster_path" :alt="serie.name" />
              <div class="serie-title">{{ serie.name }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>No series available.</p>
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
import { ref, onMounted, computed } from 'vue'
import { useSeriesStore } from '@/store/series'
import { useGenreStore } from '@/store/genres'
import type { Series } from '@/types/series'
import '../assets/styles/SeriesComponent.css'

const seriesStore = useSeriesStore()
const genreStore = useGenreStore()
const series = ref<Series[]>(seriesStore.series)
const genres = ref(genreStore.genres)
const filteredSeries = ref<Series[]>(seriesStore.series)
const selectedGenre = ref<number | string>('')
const loading = ref(true)

const currentPage = ref(1)
const itemsPerPage = 40

const totalPages = computed(() => Math.ceil(filteredSeries.value.length / itemsPerPage))

const paginatedSeries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSeries.value.slice(start, end)
})

const filterSeries = () => {
  if (selectedGenre.value) {
    filteredSeries.value = seriesStore.getSeriesByGenre(Number(selectedGenre.value))
  } else {
    filteredSeries.value = seriesStore.series
  }
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

onMounted(async () => {
  await genreStore.fetchSeriesGenres()
  await seriesStore.fetchSeries(20)
  genres.value = genreStore.genres
  series.value = seriesStore.series
  filteredSeries.value = seriesStore.series
  loading.value = false
})
</script>
