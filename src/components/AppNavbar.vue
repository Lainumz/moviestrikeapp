<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-center">
      <router-link to="/">Home</router-link>
      <router-link to="/top-rated">Mejor Valorado</router-link>
      <router-link to="/categories">Categorías</router-link>
      <router-link to="/new-releases">Estrenos</router-link>
    </div>
    <div class="navbar-right">
      <input type="text" v-model="searchQuery" @keyup.enter="searchMovies" placeholder="Buscar películas..." />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const searchMovies = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } })
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  margin-left: 1.5rem
}

.navbar-center {
  display: flex;
  justify-content: center;
  flex: 1;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 1.5rem; /* Agrega margen a la derecha */
}

.logo {
  height: 60px; /* Aumenta la altura del logo */
  margin-right: 1rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar-right input {
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin-left: 1rem; /* Mueve el buscador un poco a la izquierda */
}
</style>
