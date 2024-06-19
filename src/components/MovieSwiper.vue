<template>
  <div>
    <h3>{{ title }}</h3>
    <swiper :slides-per-view="8" :space-between="10" navigation>
      <swiper-slide v-for="movie in props.items" :key="movie.id">
        <div class="movie">
          <router-link :to="getDetailRoute(movie)" class="movie-link">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
            <p>{{ movie.title }}</p>
          </router-link>
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
  title: string,
  isSerie: boolean
}>()

const getDetailRoute = (movie: Movie) => {
  return props.isSerie ? `/serie/${movie.id}` : `/movie/${movie.id}`
}
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

.movie-link {
  text-decoration: none; /* Eliminar subrayado */
  color: white; /* Establecer el color del texto a blanco */
}

.movie-link p {
  margin: 0; /* Ajustar márgenes si es necesario */
}

.movie-link:visited {
  color: white; /* Asegurar que el color del texto visitado también sea blanco */
}

.movie-link:hover p {
  color: white; /* Asegurar que el color del texto al pasar el ratón también sea blanco */
}
</style>
