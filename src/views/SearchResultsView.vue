<template>
  <div class="search-results">
    <h1>Resultados de la Búsqueda</h1>
    <div v-if="searchResults.length">
      <div v-for="movie in searchResults" :key="movie.id" class="movie">
        <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
          <div class="tooltip">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" :alt="movie.title" />
            <span class="tooltiptext">{{ movie.title }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movies'

const route = useRoute()
const query = ref<string>('')

if (Array.isArray(route.query.q)) {
  query.value = route.query.q[0] || ''
} else if (route.query.q) {
  query.value = route.query.q as string
}

const movieStore = useMovieStore()
const searchResults = ref(movieStore.searchResults)

// Watch for changes in the route query
watch(() => route.query.q, async (newQuery) => {
  if (Array.isArray(newQuery)) {
    query.value = newQuery[0] || ''
  } else if (newQuery) {
    query.value = newQuery as string
  } else {
    query.value = ''
  }

  if (query.value) {
    await movieStore.searchMovies(query.value)
    searchResults.value = movieStore.searchResults
  } else {
    searchResults.value = []
  }
}, { immediate: true })
</script>

<style scoped>
.search-results {
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
</style>
