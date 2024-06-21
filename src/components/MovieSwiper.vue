<template>
  <div class="carousel" :class="{ 'featured-carousel': featured }">
    <h3>{{ title }}</h3>
    <div class="carousel-container">
      <button v-if="!featured && currentIndex > 0" @click="prevSlide" class="nav prev">‹</button>
      <div class="carousel-wrapper" :style="wrapperStyle">
        <div v-for="movie in items" :key="movie.id" class="carousel-slide" :class="{ 'featured-slide': featured }">
          <router-link :to="getDetailRoute(movie)" class="movie-link">
            <div v-if="featured" class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
                </div>
                <div class="flip-card-back">
                  <h4>{{ movie.title }}</h4>
                  <p>{{ movie.overview }}</p>
                </div>
              </div>
            </div>
            <div v-else class="tooltip">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
              <span class="tooltiptext">{{ movie.title }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <button v-if="!featured && currentIndex < maxIndex" @click="nextSlide" class="nav next">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import type { Movie } from '@/types/movie'

const props = defineProps<{
  items: Movie[],
  title: string,
  isSerie: boolean,
  featured: boolean
}>()

const currentIndex = ref(0)

const totalSlides = computed(() => props.items.length)
const slidesToShow = computed(() => (props.featured ? 8 : 9.65))
const maxIndex = computed(() => totalSlides.value - slidesToShow.value > 0 ? totalSlides.value - slidesToShow.value : 0)

const wrapperStyle = computed(() => ({
  transform: props.featured ? 'none' : `translateX(-${currentIndex.value * (100 / slidesToShow.value)}%)`,
  width: props.featured ? '100%' : `${(totalSlides.value / slidesToShow.value) * 100}%`
}))

const nextSlide = () => {
  if (!props.featured && currentIndex.value < maxIndex.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (!props.featured && currentIndex.value > 0) {
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

.featured-carousel {
  margin-bottom: 40px;
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
  flex: 0 0 calc(100% / 10); /* Ajustado según slidesToShow */
  box-sizing: border-box;
  margin: 0 1px; /* Reducido espacio entre diapositivas */
}

.featured-slide {
  flex: 0 0 calc(100% / 5); /* Mostrar 5 diapositivas a la vez */
  display: flex;
  align-items: center;
  justify-content: center; /* Alinear al centro */
  margin: 0; /* Eliminar margen extra */
}

.carousel-slide img {
  width: 90%; /* Asegurar que las imágenes ocupen todo el ancho del contenedor */
  height: auto; /* Mantener la proporción de las imágenes */
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.featured-slide img {
  width: 200px; /* Ajustar el tamaño de la imagen para la película destacada */
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
  width: 150px; /* Ajustar el tamaño del tooltip */
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

.movie-description {
  margin-top: 10px;
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

/* Estilos de la tarjeta giratoria */
.flip-card {
  background-color: transparent;
  width: 200px; /* Mantener el tamaño de la tarjeta */
  height: 300px;
  perspective: 1000px;
  margin-right: 10px; /* Reducir el espacio entre tarjetas */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #333;
  color: white;
  transform: rotateY(180deg);
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
}

.flip-card-back h4 {
  margin-top: 0;
}

.flip-card-back p {
  font-size: 14px;
  line-height: 1.5;
}
</style>
