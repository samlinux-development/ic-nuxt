<script lang="ts" setup>
import { useNuxtApp } from '#app'
import type { _SERVICE } from '../declarations/backend/backend.did.d';

const { $getActor } = useNuxtApp() as any;
const isLoading: Ref<boolean> = ref(false);
const inputValue: Ref<string> = ref('');
const result: Ref<string> = ref('');
let actor: _SERVICE;

onMounted(async () => {
  try {
    actor = await $getActor({});
  } catch (error) {
    console.error("Error fetching workouts:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
});

const getLastName  = async () => {
  try {
    isLoading.value = true;
    const r = await actor.getLastName();
    result.value = r;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
};

const setLastName = async () => {
  try {
    isLoading.value = true;
    await actor.setLastName(inputValue.value);
    inputValue.value = '';
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
};
</script>

<template>
  <div>
    <div>
      This demo shows how to store and retrieve a name from the Internet Computer. It uses Nuxt + NuxtUI and a IC plugin to interact with the Internet Computer.
    </div>
    <div class="mt-2">
      <div class="h-2">
        <Spinner v-if="isLoading" />
      </div>
      
      <UFormField label="Name" name="name">
        <UInput v-model="inputValue" placeholder="set new name"/>
      </UFormField>

      <UButtonGroup class="mt-2">
        <UButton color="neutral" variant="outline" label="set last name" @click="setLastName" :disabled="inputValue === ''"/>
        <UButton color="neutral" variant="outline" label="load last name" @click="getLastName" />
      </UButtonGroup>
    </div>
    
    <UCard class="mt-2 rounded-none bg-amber-100">
      <p>Last stored name: {{ result }}</p>
    </UCard>


  </div>
</template>