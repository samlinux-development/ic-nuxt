<script setup lang="ts">
  // Application-wide navigation
  const router = useRouter();
  // Define the navigation items
  const nav = [
    { label: 'Home', to: '/' },
    { label: 'Add', to: '/add' },
    { label: 'About', to: '/about' }
  ];
</script>

<template>
  <div class="app">
    <Navigation :nav="nav" />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #333;
}

.app {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
  margin: 0 0 1rem 0;
}

p {
  margin: 0 0 1rem 0;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
