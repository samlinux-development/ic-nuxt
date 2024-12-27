<script setup>
defineProps(['title'])
import { ref } from 'vue';

// Reactive variables
const count = ref(0);

// Function
function increment() {
  count.value++;
}

</script>

<template>
  <div>
    <h1> {{ title }}</h1>
    <button @click="increment">Increment</button>
    <p>Count: {{ count }}</p>
  </div>
</template>


