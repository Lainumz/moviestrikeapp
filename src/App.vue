<template>
  <div id="app">
    <AppNavbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0px;
  background-color: rgba(18, 17, 17, 0.95); /* Fondo con el color 121111 al 95% */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  margin-top: 80px; /* Ajusta este valor si el navbar es más alto */
}
</style>
