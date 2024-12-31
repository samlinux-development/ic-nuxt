<script setup lang="ts">

import { ref } from 'vue'
import { useNuxtApp } from '#app'

import { PushUp } from '../src/declarations/backend/backend.did.d.ts';
const pushUps = ref<PushUp[]>([]);
const isloading = ref(true);

onMounted(async () => {
  try {
    const { $getActor } = useNuxtApp();
    const actor = $getActor();
    const result = await actor.getPushUps();
    result.forEach(element => {
      pushUps.value.push(element[1]);
    });
    isloading.value = false;
  } catch (error) {
    console.error("Error fetching push-ups:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
});

const formatDate = (nanoseconds: number | bigint): string => {
  const milliseconds = Number(nanoseconds) / 1e6; // Convert nanoseconds to a Number
  const date = new Date(milliseconds);
  return date.toLocaleString();
}; 

</script>

<template>
  <div>
    <h1>{{ $translate('greetings.hello2') }}</h1>
    <div v-if="isloading">Loading...</div>
    <ol v-if="pushUps.length > 0">
      <li v-for="pushUp in pushUps" :key="pushUp.id">
        {{ pushUp.id }} - {{ pushUp.count }} by {{ pushUp.user }} on {{ formatDate(pushUp.date) }} 
      </li>
    </ol>
  </div>
</template>


