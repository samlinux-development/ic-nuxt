<script setup lang="ts">
import { ref } from 'vue';

interface Execution {
  count: number | null;
  repetition: number | null;
}

const executions = ref<Execution[]>([{ count: null, repetition: null }]);

const addExecution = async () => {

  const lastExecution = executions.value[executions.value.length - 1];
  if (lastExecution.count !== null && lastExecution.repetition !== null) {
    executions.value.push({ count: 1, repetition: null });
  }
};

const removeExecution = (index: number) => {
  executions.value.splice(index, 1);
};

watch(executions, (newExecutions) => {
  const lastExecution = newExecutions[newExecutions.length - 1];
  if (lastExecution && lastExecution.count !== null && lastExecution.repetition !== null) {
    addExecution();
  }
});

const totalPushUps = computed(() => {
  return executions.value.reduce((total, execution) => {
    return total + (execution.count  * execution.repetition);
  }, 0);
});

defineExpose({ totalPushUps, executions });
</script>

<template>
  <div>
   
    <div class="execution-form">
      <div v-for="(execution, index) in executions" :key="index" class="execution-item">
        <label for="count">{{$translate ('pushUps.count2')}}</label>
        <input 
          type="number" 
          v-model="execution.count"
          />

        <label for="repetition">{{$translate ('pushUps.repetition')}}</label>
        <input 
          type="number" 
          v-model="execution.repetition" 
          @keyup.enter="addExecution"
          />

        <button type="button" v-if="execution.count !== null && execution.repetition !== null" @click="addExecution">
          <Icon name="fa6-regular:square-plus" class="icon" />
        </button>
        <button type="button" v-if="index > 0" @click="removeExecution(index)">
          <Icon name="fa6-regular:trash-can" class="icon" />
        </button>
      </div>
    </div>
    {{$translate ('pushUps.totalPushUpsPerExercise')}}: {{ totalPushUps }}
  </div>
</template>

<style scoped>
  .icon {
    color: white;
    margin-top: 2px;
  }

  .execution-list {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .execution-form {
    display: grid;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .execution-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  label {
    font-weight: bold;
  }

  input,
  button {
    width: 100px;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  button {
    width: 30px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 0.25rem;
  }

  button:hover {
    background-color: #c82333;
  }
</style>