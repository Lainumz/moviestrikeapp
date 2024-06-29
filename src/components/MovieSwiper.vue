<template>
  <div class="carousel" :class="{ 'featured-carousel': featured }">
    <h3>{{ title }}</h3>
    <div class="carousel-container">
      <button v-show="showPrevArrow" @click="prevSlide" class="nav prev">‹</button>
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
      <button v-show="showNextArrow" @click="nextSlide" class="nav next">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import type { Movie } from '@/types/movie'
import '../assets/styles/MovieSwiper.css'

const props = defineProps<{
  items: Movie[],
  title: string,
  isSerie: boolean,
  featured: boolean
}>()

const currentIndex = ref(0)

const totalSlides = computed(() => props.items.length)
const slidesToShow = computed(() => (props.featured ? 5 : 8)) // Mostrar 8 películas en lugar de 10
const maxIndex = computed(() => totalSlides.value - slidesToShow.value)

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / slidesToShow.value)}%)`,
  width: `${(totalSlides.value / slidesToShow.value) * 100}%`
}))

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value // Desplazamiento circular
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value // Desplazamiento circular
}

const getDetailRoute = (movie: Movie) => {
  return props.isSerie ? `/serie/${movie.id}` : `/movie/${movie.id}`
}

const showPrevArrow = computed(() => totalSlides.value > slidesToShow.value)
const showNextArrow = computed(() => totalSlides.value > slidesToShow.value || currentIndex.value < maxIndex.value)
</script>
