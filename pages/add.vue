<script setup lang="ts">
  import { ref } from 'vue'
  let name = ref<string>('');
  const pushUps = ref<number>(0);
  const isLoading = ref<boolean>(false);
  let executionListRef = ref(null);

  const addExercise = async () => {
    
    try {
      isLoading.value = true;
      const { $getActor } = useNuxtApp();
      const actor = $getActor();
      const executions = executionListRef.value.executions;
      
      // prepare an array with the count and repetition values
      // get the total count of push-ups
      const totalCount = executions.reduce((total, execution) => {
        return total + Number(execution.count) * Number(execution.repetition);
      }, 0);

      const executionList = executions.map((execution) => {
        return { count:BigInt(Number(execution.count)), repetition: BigInt(Number(execution.repetition)) };
      });
      await actor.addPushUp(name.value, totalCount, executionList);
      name = ref('');
      // reset the execution list
      executionListRef = ref(null);

    } catch (error) {
      console.error("Error adding push-up:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    } finally {
      isLoading.value = false;
    }
  };

  const isFormValid = computed(() => {
    return name.value.trim() !== '' && executionListRef.value.totalPushUps > 0;
  });
</script>

<template>
  <h1>{{$translate ('pushUps.title')}}</h1>
  <form type="submit" v-if="!isLoading">
    <label for="name">{{$translate('pushUps.name')}}</label>
    <input type="text" v-model="name" />
    
    <ExecutionList ref="executionListRef"/>

    <button type="button" :disabled="isLoading || !isFormValid" @click="addExercise">{{$translate ('pushUps.addBtn')}}</button>
  </form>

  <div v-if="isLoading" class="loading-indicator">{{$translate ('pushUps.loading')}}</div>
</template>

<style scoped>
  form {
    display: grid;
    gap: 1rem;
    max-width: 20rem;
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