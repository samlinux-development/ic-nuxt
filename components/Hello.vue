<script setup lang="ts">
import { ref } from 'vue'

const pushUpCounts = ref<boolean>(0);
const isloading = ref(true);

const replaceCount = (str: string, count: number) => {
  return str.replace('__count__', count.toString());
};

onMounted(async () => {
  try {
    const { $getActor } = useNuxtApp();
    const actor = $getActor();
    const result = await actor.getPushUpCount();

    pushUpCounts.value = result;
    isloading.value = false;
  } catch (error) {
    console.error("Error fetching push-ups:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
});

</script>

<template>
  <div>
    <h1>{{$translate('index.title')}}</h1>
    <div>{{ replaceCount($translate('index.hello'),pushUpCounts) }} </div>
  </div>
</template>


