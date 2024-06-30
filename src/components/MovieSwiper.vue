<template>
  <div class="carousel" :class="{ 'featured-carousel': featured }">
    <h3>{{ title }}</h3>
    <div class="carousel-container">
      <button
        :class="{ 'nav': true, 'prev': true, 'disabled': !canGoPrev }"
        @click="prevSlide"
        :disabled="!canGoPrev"
      >
        ‹
      </button>
      <div class="carousel-wrapper" :style="wrapperStyle">
        <div v-for="movie in items" :key="movie.id" class="carousel-slide" :class="{ 'featured-slide': featured }">
          <router-link :to="getDetailRoute(movie)" class="movie-link">
            <div class="image-container">
              <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
              <div class="movie-overlay">{{ movie.title }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <button
        :class="{ 'nav': true, 'next': true, 'disabled': !canGoNext }"
        @click="nextSlide"
        :disabled="!canGoNext"
      >
        ›
      </button>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue'
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
const slidesToShow = ref(8) // Valor inicial

const updateSlidesToShow = () => {
  const width = window.innerWidth
  if (width >= 1200) {
    slidesToShow.value = props.featured ? 5 : 8
  } else if (width >= 992) {
    slidesToShow.value = props.featured ? 4 : 6
  } else if (width >= 768) {
    slidesToShow.value = props.featured ? 3 : 4
  } else {
    slidesToShow.value = props.featured ? 2 : 3
  }
}

onMounted(() => {
  updateSlidesToShow()
  window.addEventListener('resize', updateSlidesToShow)
})

const maxIndex = computed(() => totalSlides.value - slidesToShow.value)

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / slidesToShow.value)}%)`,
}))

const nextSlide = () => {
  if (canGoNext.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (canGoPrev.value) {
    currentIndex.value--
  }
}

const canGoNext = computed(() => currentIndex.value < maxIndex.value)
const canGoPrev = computed(() => currentIndex.value > 0)

const getDetailRoute = (movie: Movie) => {
  return props.isSerie ? `/serie/${movie.id}` : `/movie/${movie.id}`
}
</script>


<style scoped>
.carousel-container {
  position: relative;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s;
}

.nav.prev {
  left: 0;
}

.nav.next {
  right: 0;
}

.nav.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
