<script setup lang="ts">
  import { ref } from 'vue'
  const name = ref<string>('');
  const pushUps = ref<number>(0);
  const isLoading = ref<boolean>(false);

  const addExercise = async () => {
    try {
      isLoading.value = true;
      const { $getActor } = useNuxtApp();
      const actor = $getActor();
      await actor.addPushUp(name.value, BigInt(pushUps.value));
      name.value = '';
      pushUps.value = 0;
    } catch (error) {
      console.error("Error adding push-up:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    } finally {
      isLoading.value = false;
    }
  };

  const isFormValid = computed(() => {
    return name.value.trim() !== '' && pushUps.value > 0;
  });
</script>

<template>
  <h1>{{$translate ('pushUps.title')}}</h1>
  <form @submit.prevent="addExercise">
    <label for="name">{{$translate('pushUps.name')}}</label>
    <input type="text" v-model="name" />
    <label for="pushUps">{{$translate('pushUps.count')}}</label>
    <input type="number" v-model="pushUps" />
    <button type="submit" :disabled="isLoading || !isFormValid">{{$translate ('pushUps.addBtn')}}</button>
  </form>
  <div v-if="isLoading" class="loading-indicator">{{$translate ('pushUps.loading')}}</div>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
  max-width: 20rem;
  margin: 0 auto;
}

label {
  font-weight: bold;
}

input,
button {
  width: 200px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}

.loading-indicator {
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}
</style>