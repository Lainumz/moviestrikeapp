<template>
  <div class="carousel">
    <h3>{{ title }}</h3>
    <div class="carousel-container">
      <button @click="prevSlide" class="nav prev">‹</button>
      <div class="carousel-wrapper" :style="wrapperStyle">
        <div v-for="movie in items" :key="movie.id" class="carousel-slide">
          <router-link :to="getDetailRoute(movie)" class="movie-link">
            <div class="tooltip">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
              <span class="tooltiptext">{{ movie.title }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <button @click="nextSlide" class="nav next">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import type { Movie } from '@/types/movie'

const props = defineProps<{
  items: Movie[],
  title: string,
  isSerie: boolean
}>()

const currentIndex = ref(0)

const totalSlides = computed(() => props.items.length)
const slidesToShow = 10 // Número de diapositivas visibles

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / slidesToShow)}%)`,
  width: `${(totalSlides.value / slidesToShow) * 100}%`
}))

const nextSlide = () => {
  if (currentIndex.value < totalSlides.value - slidesToShow) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const getDetailRoute = (movie: Movie) => {
  return props.isSerie ? `/serie/${movie.id}` : `/movie/${movie.id}`
}
</script>

<style scoped>
.carousel {
  margin-top: 20px;
  color: white;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-slide {
  flex: 0 0 calc(100% / 10); /* Ajusta este valor basado en slidesToShow */
  box-sizing: border-box;
  margin: 0 1px; /* Reducir el espacio entre las diapositivas */
}

.carousel-slide img {
  width: 90%; /* Asegurar que las imágenes ocupen todo el ancho del contenedor */
  height: auto; /* Mantener la proporción de las imágenes */
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.carousel-slide img:hover {
  transform: scale(1.05);
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltiptext {
  visibility: hidden;
  width: 150px; /* Ajustar el tamaño del tooltip según el tamaño de la imagen */
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 105%; /* Posición encima de la imagen */
  left: 50%;
  margin-left: -75px; /* Centrar el tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.movie-link {
  text-decoration: none;
  color: white;
}

.movie-link p {
  margin: 0;
}

.movie-link:visited {
  color: white;
}

.movie-link:hover p {
  color: white;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  z-index: 10;
}

.nav.prev {
  left: 10px;
}

.nav.next {
  right: 10px;
}
</style>
