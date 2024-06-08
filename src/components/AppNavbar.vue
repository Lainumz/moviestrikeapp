<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
</template>

<script setup lang="ts">
</script>

<style>
nav {
  background-color: #2c3e50;
  padding: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

nav a:hover {
  text-decoration: underline;
}
</style>
