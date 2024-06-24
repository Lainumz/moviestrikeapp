<template>
    <div class="search-results">
      <h1>Resultados de la Búsqueda</h1>
      <div v-if="searchResults.length">
        <div v-for="movie in searchResults" :key="movie.id" class="movie">
          <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
            <div class="tooltip">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
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
import type { Movie } from '@/types/movie'
import '../assets/styles/SearchResultsComponent.css'

const route = useRoute()
const query = ref<string>('')

if (Array.isArray(route.query.q)) {
  query.value = route.query.q[0] || ''
} else if (route.query.q) {
  query.value = route.query.q as string
}

const movieStore = useMovieStore()
const searchResults = ref<Movie[]>(movieStore.searchResults)

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

  <style>

  </style>
