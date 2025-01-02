<script setup lang="ts">

interface NavItem {
  label: string;
  to: string;
}

const props = defineProps<{ nav: NavItem[] }>();

</script>
<template>
  <nav class="navigation">
    <ol>
      <li v-for="(item, index) in nav" :key="index">
        <router-link :to="item.to" class="nav-link">{{ item.label }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<style scoped>

.navigation {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ol {
  display: flex;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #007bff;
  color: white;
}

.nav-link.active {
  background-color: #0056b3;
  color: white;
}
</style>