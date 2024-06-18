<template>
  <div>
    <h3>{{ title }}</h3>
    <swiper :slides-per-view="8" :space-between="10" navigation>
      <swiper-slide v-for="movie in props.items" :key="movie.id">
        <div class="movie">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          <p>{{ movie.title }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css' // Importar estilos de Swiper aquí
import type { Movie } from '@/types/movie'
import { defineProps } from 'vue'

const props = defineProps<{
  items: Movie[],
  title: string
}>()
</script>

<style scoped>
.movie {
  display: inline-block;
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
</style>
