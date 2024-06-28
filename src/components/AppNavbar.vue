<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <div class="hamburger-menu" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-center" :class="{ 'show-menu': showMenu }">
      <router-link to="/" @click.native="closeMenu">Home</router-link>
      <router-link to="/movies" @click.native="closeMenu">Películas</router-link>
      <router-link to="/series" @click.native="closeMenu">Series</router-link>
      <router-link to="/new-releases" @click.native="closeMenu">Estrenos</router-link>
      <router-link to="/thank-you" @click.native="closeMenu">Agradecimiento</router-link>
    </div>
    <div class="navbar-right" :class="{ 'show-menu': showMenu }">
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
const showMenu = ref(false)

const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'searchResults', query: { q: searchQuery.value } })
    showMenu.value = false
  }
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}
</script>