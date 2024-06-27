<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-center">
      <router-link to="/">Home</router-link>
      <router-link to="/movies">Películas</router-link>
      <router-link to="/series">Series</router-link>
      <router-link to="/new-releases">Estrenos</router-link>
      <router-link to="/thank-you">Agradecimiento</router-link>
    </div>
    <div class="navbar-right">
      <input type="text" v-model="searchQuery" @keyup.enter="searchMovies" placeholder="Buscar películas..." />
    </div>
  </nav>
</template>

<script setup lang="ts">
import '../assets/styles/AppNavbar.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'searchResults', query: { q: searchQuery.value } })
  }
}
</script>

<style scoped>

</style>
