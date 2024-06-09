<template>
  <div class="search-results">
    <h1>Resultados de la Búsqueda</h1>
    <div v-if="searchResults.length">
      <div v-for="movie in searchResults" :key="movie.id" class="movie">
        <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" :alt="movie.title" />
          <h2>{{ movie.title }}</h2>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

onMounted(async () => {
  if (query.value) {
    await movieStore.searchMovies(query.value)
    searchResults.value = movieStore.searchResults
  }
})
</script>

<style scoped>

.movie {
  display: inline-block;
  margin: 10px;
  text-align: center;
}

.movie img {
  width: 200px;
  height: 300px;
}
</style>
