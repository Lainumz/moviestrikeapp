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
import '../assets/styles/MovieSwiper.css'

const props = defineProps<{
  items: Movie[],
  title: string,
  isSerie: boolean,
  featured: boolean
}>()

const currentIndex = ref(0)

const totalSlides = computed(() => props.items.length)
const slidesToShow = computed(() => (props.featured ? 5 : 10)) // Aseguramos que sea consistente con el CSS
const maxIndex = computed(() => totalSlides.value - slidesToShow.value)

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / slidesToShow.value)}%)`,
  width: `${(totalSlides.value / slidesToShow.value) * 100}%`
}))

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
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
