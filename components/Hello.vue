<script setup lang="ts">
import { ref } from 'vue'

const pushUpCounts = ref<boolean>(0);
const totalPushUpCount = ref<number>(0);
const isloading = ref(true);

const replaceCount = (str: string, placeholder:string, count: number) => {
  return str.replace(placeholder, count.toString());
};

onMounted(async () => {
  try {
    const { $getActor } = useNuxtApp();
    const actor = $getActor();
    const result = await actor.getPushUpCount();
    const result2 = await actor.getTotalPushUpCount();

    pushUpCounts.value = result;
    totalPushUpCount.value = result2;
    isloading.value = false;
  } catch (error) {
    console.error("Error fetching push-ups:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
});

// format the number of push-ups
const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};
</script>

<template>
  <div>
    <h1>{{$translate('index.title')}}</h1>
    <div>
      {{ replaceCount($translate('index.hello'),'__count__', pushUpCounts) }} 
      {{ replaceCount($translate('index.totalPushUps'),'__totalPushUps__',formatNumber(totalPushUpCount)) }}
    </div>
  </div>
</template>


