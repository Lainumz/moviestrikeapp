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
            <div class="tooltip">
              <img :src="'https://image.tmdb.org/t/p/w500' + serie.poster_path" :alt="serie.name" />
              <span class="tooltiptext">{{ serie.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>No series available.</p>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSeriesStore } from '@/store/series'
import { useGenreStore } from '@/store/genres'
import type { Series } from '@/types/series'

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

onMounted(async () => {
  await genreStore.fetchSeriesGenres()
  await seriesStore.fetchSeries(20) // Ajusta el número de páginas que deseas obtener para más variedad
  genres.value = genreStore.genres
  series.value = seriesStore.series
  filteredSeries.value = seriesStore.series
  loading.value = false
})
</script>

<style scoped>
.series {
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

.serie {
  display: inline-block;
  margin: 10px;
  text-align: center;
  position: relative;
}

.serie img {
  width: 200px;
  height: 300px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.serie img:hover {
  transform: scale(1.05)
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  cursor: pointer;
  margin: 0 10px;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

h1 {
  color: white;
}
</style>
