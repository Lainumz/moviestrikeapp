<template>
  <div class="new-releases">
    <h1>New Releases</h1>
    <div v-if="loading">Loading new releases...</div>
    <div v-else>
      <div v-if="newReleases.length">
        <div v-for="movie in newReleases" :key="movie.id" class="movie">
          <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
            <div class="tooltip">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
              <span class="tooltiptext">{{ movie.title }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>No new releases available.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/store/movies'
import type { Movie } from '@/types/movie'
import '../assets/styles/NewReleasesComponent.css'

const movieStore = useMovieStore()
const newReleases = ref<Movie[]>(movieStore.newReleases)
const loading = ref(true)

onMounted(async () => {
  await movieStore.fetchNewReleases() // Llamada sin argumentos
  newReleases.value = movieStore.newReleases
  loading.value = false
})
</script>

<style>

</style>
