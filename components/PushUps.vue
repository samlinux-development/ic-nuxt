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
    // sort the push-ups by date
    pushUps.value.sort((a, b) => Number(b.date) - Number(a.date));

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
    <h1>{{ $translate('pushUps.list-title') }}</h1>
    <div v-if="isloading">{{$translate('pushUps.list-loading')}}</div>
    <div v-else-if="pushUps.length === 0">{{ $translate ('pushUps.list-empty') }}</div>
    <ol v-else class="pushup-list">
      <li v-for="pushUp in pushUps" :key="pushUp.id" class="pushup-item">
        <div class="pushup-details">
    
          <span class="pushup-count">{{ pushUp.count }} {{ $translate ('pushUps.count') }}</span>
          <span class="pushup-user">{{ $translate ('pushUps.by') }} {{ pushUp.user }}</span>
          <span class="pushup-date">{{ $translate ('pushUps.at') }} {{ formatDate(pushUp.date) }}</span>
          
          <div v-if="pushUp.executions && pushUp.executions.length > 0" class="execution-details">
            <h3>{{ $translate('pushUps.executionDetails') }}</h3>
            <ul>
              <li v-for="(execution, index) in pushUp.executions" :key="index">
               {{ Number(execution.count) }} x {{ Number(execution.repetition) }} {{ $translate('pushUps.repetition') }}
              </li>
            </ul>
          </div>

        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.pushup-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.pushup-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.pushup-id {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.pushup-details {
  display: flex;
  flex-direction: column;
}

.pushup-count {
  font-size: 1.2rem;
  font-weight: bold;
}

.pushup-user,
.pushup-date {
  font-size: 0.9rem;
  color: #666;
}
.execution-details {
  margin-top: 0.5rem;
}

.execution-details h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}

.execution-details ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 0.25rem;
}

.execution-details li {
  font-size: 0.9rem;
  color: #333;
  margin-left: 0.5rem;
}
</style>

