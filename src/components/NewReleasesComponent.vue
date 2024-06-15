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

const movieStore = useMovieStore()
const newReleases = ref<Movie[]>([])
const loading = ref(true)

onMounted(async () => {
  await movieStore.fetchNewReleases(1) // Obtén solo la primera página de las nuevas películas
  newReleases.value = movieStore.newReleases.slice(0, 10) // Solo muestra las primeras 10 películas
  loading.value = false
})
</script>

<style scoped>
.new-releases {
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
  cursor: pointer;
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

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

h1 {
  color: white;
}
</style>
