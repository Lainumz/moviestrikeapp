<template>
  <div class="new-releases">
    <h1>Estrenos</h1>
    <div v-if="loading">Loading new releases...</div>
    <div v-else>
      <div v-if="newReleases.length">
        <div class="movies-grid">
          <div v-for="movie in newReleases" :key="movie.id" class="movie">
            <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
                  </div>
                  <div class="flip-card-back">
                    <h3>{{ movie.title }}</h3>
                    <p>{{ truncateOverview(movie.overview) }}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No hay nuevos estrenos</p>
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
  await movieStore.fetchNewReleases()
  newReleases.value = movieStore.newReleases
  loading.value = false
})

function truncateOverview (overview: string, maxLength = 100): string {
  return overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview
}
</script>

<style src="../assets/styles/NewReleasesComponent.css"></style>
